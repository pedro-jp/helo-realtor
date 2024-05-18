import { Inter } from 'next/font/google';
import Head from 'next/head';

import styles from '../styles/home.module.scss';

import logo from '../assets/images/logo.svg';
import Image from 'next/image';

import Link from 'next/link';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
const inter = Inter({ subsets: ['latin'] });

import { AuthContext } from '@/contexts/AuthContext';
import { FormEvent, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { GetServerSideProps } from 'next';
import { canSSRGuest } from '@/utils/canSSRGuest';

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.warn('Preencha os dados');
      return;
    }

    setIsLoading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);

    setIsLoading(false);
  }

  return (
    <>
      <Head>
        <title>Pizzaria - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt='Logo Pizzaria' />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder='Digite seu email'
              autoComplete='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='Sua senha'
              autoComplete='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type='submit' loading={isLoading}>
              Acessar
            </Button>
          </form>
          <Link href='./signup' className={styles.text}>
            Não possui cadastro? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
