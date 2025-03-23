import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Re.form | Pricing Simulator',
  description: 'Reformer Pilates Studio Pricing Strategy Simulator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600;6..96,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-bodoni">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}