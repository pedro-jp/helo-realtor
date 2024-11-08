'use client';

import styles from './styles.module.scss';
import { Sidebar } from '@/components/Sidebar';
import Head from 'next/head';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { Input, TextArea } from '@/components/ui/Input';
import { setupAPIClient } from '@/services/api';
import { useRouter } from 'next/router';
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Container from '@/components/Container';
import Content from '@/components/Content';

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

export default function Office() {
  const router = useRouter();
  const api = setupAPIClient(router);
  const { user, loading, setLoading, isAuthenticated } =
    useContext(AuthContext);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [address_city, setAdressCity] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [created, setCreated] = useState(false);

  useEffect(() => {
    console.log('user', user);
    if (user?.id !== '') {
      getOffice();
      if (name !== '') {
        setCreated(true);
      }
    }
  }, [user, isAuthenticated]);

  async function getOffice() {
    console.log('ta fzd');
    try {
      setLoading(true);
      const response = await api.get(`/office/inactive/${user?.id}`);
      const { data } = response;
      console.log(data);
      setId(data.id);
      setName(data.name);
      setPhone(data.phone);
      setAddress(data.address);
      setAdressCity(data.address_city);
      setEmail(data.email);
      setDescription(data.description);
      setCreated(true);
      console.log(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const handleCreateOffice = async (event: FormEvent) => {
    console.log('create');
    event.preventDefault();
    try {
      const response = await api.post('/office', {
        name,
        phone,
        ownerId: user?.id,
        address,
        address_city,
        email,
        description,
      });

      setId(response.data.id);

      toast.success('Escritório criado com sucesso');
      setCreated(true);
    } catch (error) {
      console.log('erro no create office', error);
    }
  };

  const handleUpdateOffice = async (event: FormEvent) => {
    event.preventDefault();
    console.log('update');
    try {
      await api.put(`/office/${id}`, {
        name,
        phone,
        address,
        address_city,
        email,
        description,
      });
      toast.success('Escritório atualizado com sucesso');
    } catch (error) {
      console.log('erro no update office', error);
    }
  };

  return (
    <>
      <Head>
        <title>Helo Realtor | Escritório</title>
      </Head>
      <Container>
        <Sidebar />
        <Content>
          <Header>Escritório</Header>
          <Main>
            <form
              className={styles.form}
              action='submit'
              onSubmit={created ? handleUpdateOffice : handleCreateOffice}
            >
              <button
                className={created ? styles.save : styles.create}
                type='submit'
              >
                {created ? 'Salvar' : 'Criar escritório'}
                <FiSave size={24} />
              </button>
              <Input
                type='text'
                value={name}
                placeholder='Nome'
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type='txt'
                value={phone}
                placeholder='Celular'
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                type='txt'
                value={address}
                placeholder='Rua Exemplo, 29 Jardim Fictício'
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                type='txt'
                value={address_city}
                placeholder='São Paulo -SP'
                onChange={(e) => setAdressCity(e.target.value)}
              />
              <Input
                type='email'
                value={email}
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextArea
                value={description}
                placeholder='Descrição'
                onChange={(e) => setDescription(e.target.value)}
              />
            </form>
          </Main>
        </Content>
      </Container>
    </>
  );
}
