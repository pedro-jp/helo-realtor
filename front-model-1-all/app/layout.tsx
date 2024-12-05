import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from './context/appContext';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Intg | Imóveis', // Use o nome do escritório nos metadados
    description: 'Intg | Imóveis, Visualize e venda seus imóveis',
    openGraph: {
      title: 'Intg | Imóveis',
      description: 'Intg | Imóveis, Visualize e venda seus imóveis',
      url: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_FRONT_URL}/favicon.ico`,
          width: 1920,
          height: 1080,
          alt: 'Intg | Imóveis'
        }
      ]
    },
    icons: {
      icon: [
        {
          url: '/favicon.ico',
          sizes: '16x16'
        },
        {
          url: '/favicon.ico',
          sizes: '32x32'
        },
        {
          url: '/favicon.ico',
          sizes: '48x48'
        }
      ],
      apple: '/favicon.ico'
    }
  };
}
export default function RootLayout({
  children
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
