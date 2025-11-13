import type { Metadata } from 'next';

import type { NoteTag } from '@/types/note';
import { NoteForm } from '@/app/components';

import css from './CreateNote.module.css';

//===========================================================================

const TAGS: NoteTag[] = [
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
  'Todo',
];

const SITE_URL = 'https://09-auth.vercel.app';

//===========================================================================

export const metadata: Metadata = {
  title: 'Create note — NoteHub',
  description:
    'Create a new note with title, content and tag. Your draft is saved automatically.',

  openGraph: {
    title: 'Create note — NoteHub',
    description:
      'Create a new note with title, content and tag. Your draft is saved automatically.',
    url: `${SITE_URL}/notes/action/create`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create note',
      },
    ],
    type: 'article',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Create note — NoteHub',
    description:
      'Create a new note with title, content and tag. Your draft is saved automatically.',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

// ================================================================

async function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm tags={TAGS} />
      </div>
    </main>
  );
}

export default CreateNote;
