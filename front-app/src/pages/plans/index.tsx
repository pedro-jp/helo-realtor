import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../../services/api';
import { useRouter } from 'next/router';
import Container from '@/components/Container';
import Content from '@/components/Content';
import { Main } from '@/components/Main';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import styles from './styles.module.scss';
import Head from 'next/head';

const Plans = () => {
  const { user } = useContext(AuthContext);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const router = useRouter();
  const api = setupAPIClient(router);

  const plans = [
    {
      name: 'Realtor Ouro',
      priceId: 'price_1Pyn0JFkkC3ZoBrEjoJzUDfu',
      descri:
        'Plano mais completo com todas as funcionalidades exceto site e domínio dedicado.',
      price: 59.99,
    },

    {
      name: 'Realtor Diamante',
      priceId: 'price_1Pyn9JFkkC3ZoBrEjoJzUDfu',
      descri:
        'Plano mais completo com todas as funcionalidades com site e domínio dedicado.',
      info: 'Tempo de ativação de até 3 dias úteis.',
      price: 99.99,
    },
    {
      name: 'Realtor Prata',
      priceId: 'price_1PyPKbFkkC3ZoBrEhihlBkHZ',
      descri: 'Plano mais simples com todas as funcionalidades.',
      price: 29.99,
    },
  ];

  async function handleSubscribe() {
    if (!selectedPriceId) {
      toast.error('Selecione um plano para assinar');
      return;
    }

    try {
      const response = await api.post('/checkout', {
        email: user.email,
        priceId: selectedPriceId,
      });
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl; // Redireciona para a URL de checkout
    } catch (error) {
      toast.error('Erro ao criar sessão de checkout');
    }
  }

  return (
    <>
      <Head>
        <title>Helo Realtor | Planos</title>
      </Head>
      <Container>
        <Sidebar />
        <Content>
          <Header>Planos</Header>
          <Main>
            <div className={styles.container}>
              {plans.map((plan) => (
                <label key={plan.priceId}>
                  <div
                    className={
                      user.priceId === plan.priceId
                        ? styles.planActive
                        : styles.card
                    }
                    style={{
                      cursor:
                        user.priceId === plan.priceId
                          ? 'not-allowed'
                          : 'pointer',
                    }}
                  >
                    <div>
                      <h2>{plan.name}</h2>
                      <p>{plan.descri}</p>
                      {plan.info && <p>{plan.info}</p>}
                      <p>R$ {plan.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <div>
                        <input
                          type='checkbox'
                          checked={selectedPriceId === plan.priceId}
                          onChange={() => setSelectedPriceId(plan.priceId)}
                          disabled={user.priceId === plan.priceId}
                        />
                      </div>
                    </div>
                  </div>
                </label>
              ))}
              <div>
                <button
                  onClick={handleSubscribe}
                  className={styles.subscribeButton}
                >
                  Assinar Plano Selecionado
                </button>
              </div>
            </div>
          </Main>
        </Content>
      </Container>
    </>
  );
};

export default Plans;
