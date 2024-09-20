import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import NavBar from '@/components/nav-bar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Deadlock Utility',
  description: 'A player made website for Deadlock.',
  icons: 'https://deadlocked.wiki/favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar`}
      >
        <div className="container fixed inset-0 max-w-full">
          <NavBar />
        </div>
        <main className="container pt-16 mx-auto">{children}</main>
      </body>
    </html>
  );
}
