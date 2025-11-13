'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/app/components';
import { updateMe, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from './EditProfilePage.module.css';

//===========================================================================

function EditProfile() {
  const router = useRouter();
  const setUser = useAuthStore(s => s.setUser);

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

  const unchanged = username.trim() === initialUsername.trim();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const updated = await updateMe({ username });

      if (updated) {
        setUser(updated);
      } else {
        const fresh = await getMe();
        setUser(fresh);
      }

      router.push('/profile');
      router.refresh();
    } catch {
      setError('Unable to save. Try again.');
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
            disabled={unchanged || saving}
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
