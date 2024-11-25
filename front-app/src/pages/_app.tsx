import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import '../styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastContainer autoClose={2500} />
      <Head>
        <title>IntG Realtor</title>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
