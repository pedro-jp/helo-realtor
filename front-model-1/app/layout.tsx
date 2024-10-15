import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from './context/appContext';
import Navbar from './components/navbar';
import { Footer } from './components/footer';
import { getOffice } from './services/getOffice';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const office = await getOffice();

  return {
    title: office?.name, // Use o nome do escritório nos metadados
    description: office?.description,
    openGraph: {
      title: office?.name,
      description: office?.description,
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
        <Navbar />
        <AppProvider>{children}</AppProvider>
        <Footer />
      </body>
    </html>
  );
}
