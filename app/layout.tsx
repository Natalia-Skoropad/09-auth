import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import {
  Header,
  Footer,
  TanStackProvider,
  AuthProvider,
} from '@/app/components';

import './globals.css';
import 'modern-normalize/modern-normalize.css';

//===========================================================================

const SITE_URL = 'https://09-auth-henna-seven.vercel.app';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

//===========================================================================

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'NoteHub — simple notes app',
  description:
    'Create, search and manage personal notes with tags, filters and previews.',

  openGraph: {
    title: 'NoteHub — simple notes app',
    description:
      'Create, search and manage personal notes with tags, filters and previews.',
    url: SITE_URL,
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
    title: 'NoteHub — simple notes app',
    description:
      'Create, search and manage personal notes with tags, filters and previews.',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

//===========================================================================

function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />

            <main>
              {children}
              {modal}
            </main>

            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}

export default RootLayout;
