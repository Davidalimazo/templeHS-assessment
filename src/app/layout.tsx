import { Metadata } from 'next';
import RootStyleRegistry from './emotion';
import ToasterProvider from '@/providers/ToasterProvider';
import './globals.css';


export const metadata: Metadata = {
  title: 'templehs | Health Services',
  manifest:"",
  description: 'Online Dental Solution',
  applicationName: 'templehs',
  generator: 'templehs',
  authors: [
    { name: 'Alimazoya David', url: 'https://davidalimazo.vercel.app' },
    { name: 'Chukwualuka Chiama', url: 'https://example.com/' },
  ],
  creator: 'Chukwualuka Chiama',
  colorScheme: 'light',
  publisher: 'Alimazoya David',
  icons: {
    icon: {
      url: '/next.svg',
      type: 'image/svg',
    },
    shortcut: { url: 'next.svg', type: 'image/svg' },
  },
  openGraph: {
    title: 'templehs | Health Services',
    description: 'Online Dental Solution',
    url: 'https://templehs.com',
    siteName: 'templehs',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en-US',
    type: 'website',
    emails: 'info@templehs.com',
  },

  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],

  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  bookmarks: ['https://example.com'],
  category: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head />
      <body>
        <RootStyleRegistry>{children}</RootStyleRegistry>
        <ToasterProvider />
      </body>
    </html>
  );
}
