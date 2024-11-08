import React, { useState, useEffect, useContext, FormEvent } from 'react';
import { setupAPIClient } from '../../services/api'; // Importação da sua API configurada
import { AuthContext } from '../../contexts/AuthContext'; // Contexto de autenticação para pegar o ID do usuário
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Sidebar } from '@/components/Sidebar';
import Container from '@/components/Container';
import Content from '@/components/Content';
import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { Input, TextArea } from '@/components/ui/Input';
import styles from './styles.module.scss';
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';

type OfficeType = {
  id: string;
  name: string;
  phone: string;
  address: string;
  address_city: string;
  address_state: string;
  description: string;
  email: string;
  realtors: RealtorType[];
};

type RealtorType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  creci: string;
  whatsapp_message: string;
};

const RealtorForm = () => {
  const { user, loading, setLoading, isAuthenticated } =
    useContext(AuthContext); // Pega o usuário logado do contexto
  const [office, setOffice] = useState<OfficeType | null>(null);

  const [realtorName, setRealtorName] = useState('');
  const [realtorEmail, setRealtorEmail] = useState('');
  const [realtorPhone, setRealtorPhone] = useState('');
  const [realtorMessage, setRealtorMessage] = useState('');
  const [realtorCreci, setRealtorCreci] = useState('');
  const [selectedRealtorId, setSelectedRealtorId] = useState<string | null>(
    null
  );

  const router = useRouter();

  const api = setupAPIClient(router);

  useEffect(() => {
    getOffice();
  }, [user, isAuthenticated]);

  const getOffice = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/office/inactive/${user.id}`);
      setOffice(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRealtor = async (e: FormEvent) => {
    e.preventDefault();
    if (!office) return;
    try {
      setLoading(true);
      const response = await api.post(`/office/${office.id}/realtors`, {
        name: realtorName,
        email: realtorEmail,
        phone: realtorPhone,
        creci: realtorCreci,
        whatsapp_message: realtorMessage,
      });

      setOffice({
        ...office,
        realtors: [...office.realtors, response.data],
      });
      toast.success('Realtor criado com sucesso');
      clearForm();
    } catch (error) {
      toast.error('Crie novamente');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRealtor = async (e: FormEvent) => {
    e.preventDefault();

    if (!office || !selectedRealtorId) return;
    try {
      setLoading(true);
      const response = await api.put(
        `/office/${office.id}/realtors/${selectedRealtorId}`,
        {
          name: realtorName,
          email: realtorEmail,
          phone: realtorPhone,
          creci: realtorCreci,
          whatsapp_message: realtorMessage,
        }
      );

      setOffice({
        ...office,
        realtors: office.realtors.map((r) =>
          r.id === selectedRealtorId ? response.data : r
        ),
      });

      toast.success('Corrretor atualizado com sucesso');
      clearForm();
    } catch (error) {
      toast.error('Crie novamente');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setRealtorName('');
    setRealtorEmail('');
    setRealtorPhone('');
    setRealtorMessage('');
    setRealtorCreci('');
    setSelectedRealtorId(null);
  };

  // Preencher o formulário com os dados do corretor para edição
  const loadRealtorData = (realtor: RealtorType) => {
    setRealtorName(realtor.name);
    setRealtorEmail(realtor.email);
    setRealtorPhone(realtor.phone);
    setRealtorMessage(realtor.whatsapp_message);
    setRealtorCreci(realtor.creci);
    setSelectedRealtorId(realtor.id);
  };

  return (
    <>
      <Head>
        <title>IntG Realtor | Corretores</title>
      </Head>
      <Container>
        <Sidebar />
        <Content>
          <Header>Corretores</Header>
          <Main>
            <h2>
              {selectedRealtorId ? 'Atualizar Corretor' : 'Criar Corretor'}
            </h2>

            <form
              onSubmit={
                selectedRealtorId ? handleUpdateRealtor : handleCreateRealtor
              }
              className={styles.form}
            >
              <Input
                type='text'
                value={realtorName}
                onChange={(e) => setRealtorName(e.target.value)}
                placeholder='Nome do corretor'
              />
              <Input
                type='email'
                value={realtorEmail}
                onChange={(e) => setRealtorEmail(e.target.value)}
                placeholder='Email do corretor'
              />
              <Input
                type='text'
                value={realtorPhone}
                onChange={(e) => setRealtorPhone(e.target.value)}
                placeholder='Telefone do corretor'
              />
              <Input
                type='text'
                value={realtorCreci}
                onChange={(e) => setRealtorCreci(e.target.value)}
                placeholder='CRECI do corretor'
              />
              <TextArea
                value={realtorMessage}
                onChange={(e) => setRealtorMessage(e.target.value)}
                placeholder='Mensagem para WhatsApp'
              />

              {selectedRealtorId ? (
                <button className={styles.update} type='submit'>
                  Atualizar Corretor
                  <FiSave size={24} />
                </button>
              ) : (
                <button
                  className={styles.create}
                  type='button'
                  onClick={handleCreateRealtor}
                >
                  Criar Corretor
                  <FiSave size={24} />
                </button>
              )}
            </form>
            <h2>Corretores Cadastrados</h2>
            <section className={styles.realtors}>
              {/* Exibição de corretores existentes */}
              {office?.realtors.map((realtor) => (
                <div key={realtor.id}>
                  <div className={styles.realtor}>
                    <p>Nome: {realtor.name}</p>
                    <p>Email: {realtor.email}</p>
                    <p>Celular: {realtor.phone}</p>
                    <p>Creci: {realtor.creci}</p>
                    <p>Mensagem: {realtor.whatsapp_message}</p>
                  </div>

                  <button
                    className={styles.edit}
                    onClick={() => loadRealtorData(realtor)}
                  >
                    Editar
                    <FiSave size={24} />
                  </button>
                </div>
              ))}
            </section>
          </Main>
        </Content>
      </Container>
    </>
  );
};

export default RealtorForm;
