import { canSSRAuth } from '@/utils/canSSRAuth';
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import Head from 'next/head';
import { FiRefreshCcw } from 'react-icons/fi';
import { setupAPIClient } from '@/services/api';
import { useContext, useState } from 'react';
import Modal from 'react-modal';
import { ModalOrder } from '@/components/ModalOrder';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};
export interface HomeProps {
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string;
  };
};

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>Helo Realtor</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <h1>{user.name}</h1>
      </main>
    </>
  );
}
