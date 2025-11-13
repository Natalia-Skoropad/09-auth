'use client';

import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import * as Yup from 'yup';

import { Button } from '@/app/components';
import { updateMe, getMe } from '@/lib/api/clientApi';

import css from './EditProfilePage.module.css';

//===========================================================================

const schema = Yup.object({
  username: Yup.string()
    .min(2, 'Username must be at least 2 characters')
    .required('Username is required'),
});

//===========================================================================

function EditProfile() {
  const router = useRouter();

  const [avatar, setAvatar] = useState(
    'https://ac.goit.global/fullstack/react/default-avatar.jpg'
  );
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [initialUsername, setInitialUsername] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getMe()
      .then(u => {
        setAvatar(u.avatar);
        setEmail(u.email);
        setUsername(u.username ?? '');
        setInitialUsername(u.username ?? '');
      })
      .catch(() => {});
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError('');
  };

  const valid = useMemo(() => {
    try {
      schema.validateSync({ username }, { abortEarly: true });
      return true;
    } catch {
      return false;
    }
  }, [username]);

  const unchanged = username.trim() === initialUsername.trim();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const { username: validName } = await schema.validate(
        { username },
        { abortEarly: true }
      );
      setSaving(true);
      await updateMe({ username: validName });
      router.push('/profile');
    } catch (e) {
      const msg =
        e instanceof Yup.ValidationError
          ? e.message
          : 'Unable to save. Try again.';
      setError(msg);
      setSaving(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={onSubmit} noValidate>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <div className={css.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className={`${css.input} ${error ? css.inputError : ''}`}
            type="text"
            value={username}
            onChange={handleChange}
            aria-invalid={!!error}
          />
          {error && <span className={css.errorField}>{error}</span>}
        </div>

        <p className={css.emailLine}>Email: {email}</p>

        <div className={css.actions}>
          <Button
            type="submit"
            text={saving ? 'Saving…' : 'Save'}
            disabled={!valid || unchanged || saving}
          />
          <Button
            type="button"
            variant="cancel"
            text="Cancel"
            onClick={() => router.push('/profile')}
          />
        </div>
      </form>
    </main>
  );
}

export default EditProfile;
