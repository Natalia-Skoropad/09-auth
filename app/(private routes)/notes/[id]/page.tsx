import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import type { Metadata } from 'next';

import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';

// ================================================================

const SITE_URL = 'https://09-auth-henna-seven.vercel.app';

interface PageProps {
  params: Promise<{ id: string }>;
}

// ================================================================

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    const title = `Note: ${note.title} | NoteHub`;
    const description = (note.content ?? '').slice(0, 160) || 'Note details.';
    const url = `${SITE_URL}/notes/${id}`;

    return {
      title,
      description,

      openGraph: {
        title,
        description,
        url,
        siteName: 'NoteHub',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
        type: 'article',
      },

      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
      },
    };
  } catch {
    const title = 'Note details | NoteHub';
    const description = 'View note details.';
    const url = `${SITE_URL}/notes/${id}`;

    return {
      title,
      description,

      openGraph: {
        title,
        description,
        url,
        siteName: 'NoteHub',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'NoteHub',
          },
        ],
        type: 'article',
      },

      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
      },
    };
  }
}

//===========================================================================

async function NoteDetails({ params }: PageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export default NoteDetails;
