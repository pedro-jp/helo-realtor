import { Inter } from 'next/font/google';
import Head from 'next/head';

import styles from '../styles/home.module.scss';

import background from '@/assets/images/interior.jpg';
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
      <Image
        className={styles.background}
        src={background}
        alt='background'
      ></Image>
      <Head>
        <title>IntG Realtor | Login</title>
        <link rel='icon' href='./favicon.ico' sizes='any' />
        <meta
          name='description'
          content='Ferramenta para exposição de imóveis'
        />
        <meta property='og:title' content='IntG Realtor | Login' />
        <meta
          property='og:description'
          content='Faça login na plataforma IntG Realtor para acessar nossas ferramentas exclusivas.'
        />
        <meta
          property='og:image'
          content='https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        />
        <meta property='og:url' content='https://realtor.intg.com.br' />
        <meta property='og:type' content='website' />
      </Head>
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div className={styles.containerCenter}>
          <h1>Faça seu login</h1>
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
      </main>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
