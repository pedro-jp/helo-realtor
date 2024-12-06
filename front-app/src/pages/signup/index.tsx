import { Inter } from 'next/font/google';
import Head from 'next/head';

import styles from '../../styles/home.module.scss';
import background from '../../assets/images/interior.jpg';
import Image from 'next/image';

import Link from 'next/link';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

export default function Signup() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (name === '' || email === '' || password === '') {
      toast.warn('Preencha os dados');
      return;
    }

    setIsLoading(true);

    let data = {
      name,
      email,
      password
    };

    await signUp(data);
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>IntG Realtor | Cadastro</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.containerCenter}>
          <div className={styles.login}>
            <h1>Criando sua conta</h1>
            <form onSubmit={handleSubmit}>
              <Input
                placeholder='Digite seu nome'
                type='text'
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder='Digite seu email'
                type='text'
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder='Sua senha'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type='submit' loading={isLoading}>
                Cadastrar
              </Button>
            </form>
            <Link href='/' className={styles.text}>
              Já possui uma conta? Faça login
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
