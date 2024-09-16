import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import NavBar from '@/app/components/nav-bar';

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="container mx-auto fixed inset-x-0 top-5">
          <NavBar />
        </div>
        <main className="container pt-20 mx-auto inset-x-0">{children}</main>
      </body>
    </html>
  );
}
