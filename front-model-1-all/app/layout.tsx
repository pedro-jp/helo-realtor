import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from './context/appContext';
import Navbar from './components/navbar';
import { Footer } from './components/footer';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Oi', // Use o nome do escritório nos metadados
    description: 'teste',
    openGraph: {
      title: 'teste',
      description: 'teste',
      url: `${process.env.NEXT_PUBLIC_URL}`,
    },
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
