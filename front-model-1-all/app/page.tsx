import React from 'react';
import AppHome from './AppHome/page';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    icons: {
      icon: [
        {
          url: '/favicon.ico',
          sizes: '16x16',
        },
        {
          url: '/favicon.ico',
          sizes: '32x32',
        },
        {
          url: '/favicon.ico',
          sizes: '48x48',
        },
      ],
      apple: '/favicon.ico',
    },
  };
}

export default function App() {
  return (
    <>
      <AppHome />
    </>
  );
}
