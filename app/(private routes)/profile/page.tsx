import type { Metadata } from 'next';
import Image from 'next/image';

import { getMe } from '@/lib/api/serverApi';
import { LinkButton } from '@/app/components';

import css from './ProfilePage.module.css';

//===========================================================================

const SITE_URL = 'https://09-auth-henna-seven.vercel.app';

export const metadata: Metadata = {
  title: 'Profile — NoteHub',
  description:
    'User profile: avatar, username and email. Manage your NoteHub account.',

  openGraph: {
    title: 'Profile — NoteHub',
    description:
      'User profile: avatar, username and email. Manage your NoteHub account.',
    url: `${SITE_URL}/profile`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile',
      },
    ],
    type: 'profile',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Profile — NoteHub',
    description:
      'User profile: avatar, username and email. Manage your NoteHub account.',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

// ================================================================

async function Profile() {
  const user = await getMe();

  return (
    <section className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <LinkButton href="/profile/edit" text="Edit Profile" />
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt={user.username || 'User Avatar'}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <dl className={css.info}>
          <div className={css.row}>
            <dt>Username</dt>
            <dd>{user.username || '—'}</dd>
          </div>
          <div className={css.row}>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export default Profile;
