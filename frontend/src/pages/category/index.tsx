import { Header } from '@/components/Header';
import Head from 'next/head';

import styles from './styles.module.scss';
import { Input } from '@/components/ui/Input';
import { FormEvent, useState } from 'react';
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';
import { canSSRAuth } from '@/utils/canSSRAuth';

export default function Category() {
  const [name, setName] = useState('');

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    if (name === '') return;

    const apiClient = setupAPIClient();
    await apiClient.post('/category', {
      name,
    });
    toast.success('Categoria cadastrada com sucesso');
    setName('');
  };

  return (
    <>
      <Head>
        <title>Nova categoria - Pizzaria</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <h1>Cadastrar categoria</h1>
        <form>
          <Input
            type='text'
            placeholder='Digite o nome da categoria'
            onChange={(e) => setName(e.target.value)}
          />

          <button onClick={handleRegister} type='submit'>
            Cadastrar
          </button>
        </form>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
