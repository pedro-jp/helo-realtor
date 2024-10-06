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

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || []);
  const { signOut } = useContext(AuthContext);

  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal() {
    setModalVisible(!modalVisible);
  }

  async function handleFinishItem(id: string) {
    const apiClient = setupAPIClient(signOut);
    await apiClient.put('/order/finish', {
      order_id: id,
    });
    const response = await apiClient.get('/orders');

    setOrderList(response.data);
    setModalVisible(false);
  }

  async function handleRefreshOrder() {
    const apiClient = setupAPIClient(signOut);
    const response = await apiClient.get('/orders');
    setOrderList(response.data);
  }

  async function handleOpenModalView(id: string) {
    const apiClient = setupAPIClient(signOut);

    const response = await apiClient.get('/order/detail', {
      params: {
        order_id: id,
      },
    });
    setModalItem(response.data);
    setModalVisible(!modalVisible);
  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Pizzaria</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <div>
          <div style={{ display: 'flex' }}>
            <h1>Útimos pedidos</h1>
            <button>
              <FiRefreshCcw
                onClick={handleRefreshOrder}
                color='#3fffa3'
                size={25}
                style={{ cursor: 'pointer' }}
              />
            </button>
          </div>
          <article>
            {orderList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum pedido aberto foi encontrado
              </span>
            )}
            {orderList.map((order) => {
              return (
                <section key={order.id}>
                  <button onClick={() => handleOpenModalView(order.id)}>
                    <div></div>
                    <span>Mesa {order.table}</span>
                  </button>
                </section>
              );
            })}
          </article>
        </div>
      </main>
      {modalVisible && modalItem && (
        <ModalOrder
          handleFinishOrder={handleFinishItem}
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          order={modalItem}
        />
      )}
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/orders');

  return {
    props: {
      orders: response.data,
    },
  };
});
