import React, { useContext, useEffect, useState } from 'react';
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
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { IoAdd, IoSend } from 'react-icons/io5';
import {
  IoIosAddCircleOutline,
  IoIosAirplane,
  IoIosPaperPlane,
} from 'react-icons/io';

type Plan = {
  name: string;
  priceId: string;
  descri: string;
  info?: string;
  price: number;
};

const Plans = () => {
  const { user, loading, setLoading, handleReloadUser } =
    useContext(AuthContext);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const router = useRouter();
  const api = setupAPIClient(router);
  const [indicationEmail, setIndicationEmail] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [hasUser, setHasUser] = useState<boolean>(false);

  useEffect(() => {
    handleReloadUser();
  }, []);

  const plans: Plan[] = [
    // {
    //   name: 'Realtor Ouro',
    //   priceId: process.env.NEXT_PUBLIC_STRIPE_OURO_PRICE_ID as string,
    //   descri:
    //     'Plano mais completo com todas as funcionalidades exceto site e domínio dedicado.',
    //   price: 59.99,
    // },

    // {
    //   name: 'Realtor Diamante',
    //   priceId: 'price_1Pyn9JFkkC3ZoBrEjoJzUDfu',
    //   descri:
    //     'Plano mais completo com todas as funcionalidades com site e domínio dedicado.',
    //   info: 'Tempo de ativação de até 3 dias úteis.',
    //   price: 99.99,
    // },
    {
      name: 'Realtor Prata',
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRATA_PRICE_ID as string,
      descri:
        'Plano mais simples com todas as funcionalidades, exceto domínio dedicado.',
      price: 39.99,
    },
  ];

  async function handleSubscribe() {
    if (!selectedPriceId) {
      toast.error('Selecione um plano para assinar');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/checkout', {
        email: user.email,
        priceId: selectedPriceId,
      });
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl; // Redireciona para a URL de checkout
    } catch (error) {
      toast.error('Erro ao criar sessão de checkout');
    } finally {
      setLoading(false);
    }
  }

  const handleSendIndication = async () => {
    if (indicationEmail === '') {
      toast.error('Digite um email');
      return;
    }
    try {
      setLoading(true);
      await api.post(`/indication/${indicationEmail}/${user.id}`);
      toast.success('Indicado com sucesso!');
      setSuccess(true);
      console.log(`/indication/${indicationEmail}/${user.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>IntG Realtor | Planos</title>
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
                      {plan?.info && <p>{plan?.info}</p>}
                      <p>
                        <strong>R$ {plan.price.toLocaleString('pt-BR')}</strong>
                        /m
                      </p>
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
              {user.priceId !== plans[0].priceId && (
                <div>
                  <button
                    onClick={handleSubscribe}
                    className={styles.subscribeButton}
                  >
                    Assinar Plano Selecionado
                  </button>
                </div>
              )}
            </div>
            <div>
              <h1 style={{ marginTop: '1rem' }}>Indique e ganhe!</h1>
              <p style={{ marginBlock: '1rem' }}>
                A cada 10 usuários indicados, você ganha uma mensalidade.
              </p>
              <h4>
                Indicações feitas{' '}
                <strong
                  style={{
                    color: user.indicationsMade?.length ? 'green' : 'red',
                  }}
                >
                  {user.indicationsMade?.length}
                </strong>
              </h4>
            </div>
            {user.planIsActive &&
              (user.indicationsReceived?.length === 0 ||
                !user.indicationsReceived) &&
              !success && (
                <div
                  className={styles.indication}
                  style={{ marginTop: '2rem' }}
                >
                  <h2 style={{ marginBottom: '10px' }}>Alguém te indicou?</h2>
                  <div>
                    <label htmlFor=''>
                      <Input
                        type='email'
                        autoComplete='email'
                        value={indicationEmail}
                        onChange={(e) => setIndicationEmail(e.target.value)}
                        placeholder='exemplo@email.com'
                      />
                    </label>
                    <Button
                      className={styles.button_indication}
                      onClick={handleSendIndication}
                    >
                      <IoSend size={20} color='#5C8A72' />
                    </Button>
                  </div>
                </div>
              )}
          </Main>
        </Content>
      </Container>
    </>
  );
};

export default Plans;
