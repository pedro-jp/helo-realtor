import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import '../styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import Dashboard from './dashboard';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastContainer autoClose={2500} />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
