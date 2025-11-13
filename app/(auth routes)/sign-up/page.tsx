'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as Yup from 'yup';

import { register, type RegisterRequest } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { ApiError } from '@/app/api/api';
import { Button } from '@/app/components';

import css from './SignUpPage.module.css';

//===========================================================================

const signUpSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email.')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

type SignUpForm = RegisterRequest;

//===========================================================================

function SignUp() {
  const router = useRouter();
  const setUser = useAuthStore(s => s.setUser);

  const [values, setValues] = useState<SignUpForm>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpForm, string>>
  >({});
  const [authError, setAuthError] = useState('');

  const validateField = async (name: keyof SignUpForm, value: string) => {
    try {
      await signUpSchema.validateAt(name as string, {
        ...values,
        [name]: value,
      });
      setErrors(prev => ({ ...prev, [name]: '' }));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors(prev => ({ ...prev, [name]: err.message }));
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = name as keyof SignUpForm;

    setValues(prev => ({ ...prev, [field]: value }));
    setAuthError('');
    void validateField(field, value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError('');

    try {
      const valid = (await signUpSchema.validate(values, {
        abortEarly: false,
      })) as SignUpForm;

      setErrors({});

      const user = await register(valid);
      setUser(user);
      router.push('/profile');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const fieldErrors: Partial<Record<keyof SignUpForm, string>> = {};
        err.inner.forEach(issue => {
          const path = issue.path as keyof SignUpForm | undefined;
          if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }

      const apiErr = err as ApiError;
      if (apiErr.response?.status === 409) {
        setAuthError('This email is already registered.');
        return;
      }

      setAuthError(
        apiErr.response?.data?.error ??
          apiErr.message ??
          'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <section className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <h1 className={css.formTitle}>Sign up</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            className={`${css.input} ${errors.email ? css.inputError : ''}`}
            type="email"
            name="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <span className={css.errorField}>{errors.email}</span>
          )}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password*</label>
          <input
            id="password"
            className={`${css.input} ${errors.password ? css.inputError : ''}`}
            type="password"
            name="password"
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password && (
            <span className={css.errorField}>{errors.password}</span>
          )}
        </div>

        {authError && <p className={css.errorCommon}>{authError}</p>}

        <Button type="submit" text="Register" variant="normal" />

        <p className={css.helper}>
          Already have an account?{' '}
          <Link href="/sign-in" className={css.link}>
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}

export default SignUp;
