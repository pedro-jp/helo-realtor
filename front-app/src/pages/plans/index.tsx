import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../../services/api';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import Container from '@/components/Container';
import Content from '@/components/Content';
import { Main } from '@/components/Main';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Plans = () => {
  const { user, setUser } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState('');
  const [selectedPlan, setSelectedPlan] = useState({ name: '', price: 0 });
  const [hasPlan, setHasPlan] = useState(false);
  const router = useRouter();

  useEffect(() => {
    updateUser();
  }, []);
  const api = setupAPIClient(router);
  async function updateUser() {
    console.log('111111111111111111');
    try {
      api.get(`/me/${user.email}`).then((response) => {
        const {
          id,
          name,
          email,
          subscriptionId,
          token,
          priceId,
          planIsActive,
          offices,
        } = response.data;

        setUser({
          id,
          name,
          email,
          token,
          subscriptionId,
          priceId,
          planIsActive,
          offices,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  const plans = [
    {
      link: 'https://buy.stripe.com/test_4gw175fQge5pcJq9AA',
      priceId: 'price_1Pyn0JFkkC3ZoBrEjoJzUDfu',
      price: 59.99,
    },
    {
      link: 'https://buy.stripe.com/test_9AQ5nl5bC5yTeRyfYZ',
      priceId: 'price_1PyPKbFkkC3ZoBrEhihlBkHZ',
      price: 29.99,
    },
  ];
  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>Planos</Header>
        <Main>
          {plans.map((plan) => (
            <div key={plan.priceId}>
              <p>R$ {plan.price}</p>
              {user.priceId !== plan.priceId && (
                <a href={`${plan.link}?prefilled_email=${user?.email}`}>
                  Assine
                </a>
              )}
              {user.token}
              <br />
            </div>
          ))}
        </Main>
      </Content>
    </Container>
  );
};

export default Plans;

const CheckoutForm = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para processar o pagamento aqui, se necessário
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Apenas pagamento com cartão */}
      <PaymentElement />
      <button type='submit' className={styles.submitButton}>
        Finalizar
      </button>
    </form>
  );
};
