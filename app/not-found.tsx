import type { Metadata } from 'next';
import css from './not-found.module.css';

// ================================================================

const SITE_URL = 'https://09-auth-henna-seven.vercel.app';

// ================================================================

export const metadata: Metadata = {
  title: '404 — Page not found | NoteHub',
  description: 'The page you are looking for does not exist.',

  openGraph: {
    title: '404 — Page not found | NoteHub',
    description: 'The page you are looking for does not exist.',
    url: `${SITE_URL}/404`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: '404 — Page not found | NoteHub',
    description: 'The page you are looking for does not exist.',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

// ================================================================

function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
