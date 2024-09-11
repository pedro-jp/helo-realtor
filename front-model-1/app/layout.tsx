import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from './context/appContext';
import Navbar from './components/navbar';
import { Footer } from './components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>
        <Navbar />
        <AppProvider>{children}</AppProvider>
        <Footer />
      </body>
    </html>
  );
}
