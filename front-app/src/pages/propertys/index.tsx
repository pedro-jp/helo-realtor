import styles from './styles.module.scss';
import { Sidebar } from '@/components/Sidebar';
import Head from 'next/head';
import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

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
        <title>Helo Realtor | Propriedades</title>
      </Head>
      <Sidebar />
      <main className={styles.container}>
        <h1>Propriedades</h1>
      </main>
    </>
  );
}
