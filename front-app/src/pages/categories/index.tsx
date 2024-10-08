import React, { useState, useEffect, useContext } from 'react';
import { setupAPIClient } from '../../services/api'; // Importação da sua API configurada
import { AuthContext } from '../../contexts/AuthContext'; // Contexto de autenticação para pegar o ID do usuário
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Sidebar } from '@/components/Sidebar';
import Container from '@/components/Container';
import Content from '@/components/Content';
import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { Input } from '@/components/ui/Input';
import styles from './styles.module.scss';
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';

type CategoryType = {
  id: string;
  name: string;
};

const Categories = () => {
  const { user } = useContext(AuthContext); // Pega o usuário logado do contexto
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const router = useRouter();
  const api = setupAPIClient(router);

  useEffect(() => {
    listCategories();
  }, []);

  const listCategories = async () => {
    try {
      const response = await api.get(`/category/${user.id}`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      const response = await api.post('/category', {
        ownerId: user.id,
        name: categoryName,
      });

      setCategories([...categories, response.data]);
      toast.success('Categoria criada com sucesso');
      clearForm();
    } catch (error) {
      toast.error('Erro ao criar categoria');
      console.error(error);
    }
  };

  const handleUpdateCategory = async () => {
    if (!selectedCategoryId) return;
    try {
      const response = await api.put(`/category/${selectedCategoryId}`, {
        name: categoryName,
      });

      setCategories(
        categories.map((category) =>
          category.id === selectedCategoryId ? response.data : category
        )
      );
      toast.success('Categoria atualizada com sucesso');
      clearForm();
    } catch (error) {
      toast.error('Erro ao atualizar categoria');
      console.error(error);
    }
  };

  const clearForm = () => {
    setCategoryName('');
    setSelectedCategoryId(null);
  };

  const loadCategoryData = (category: CategoryType) => {
    setCategoryName(category.name);
    setSelectedCategoryId(category.id);
  };

  return (
    <>
      <Head>
        <title>Helo Realtor | Categorias</title>
      </Head>
      <Container>
        <Sidebar />
        <Content>
          <Header>Categorias</Header>
          <Main>
            <h2>Criar Categoria</h2>

            <form style={{ marginTop: '8px' }} className={styles.form}>
              <Input
                type='text'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder='Nome da categoria'
              />

              <button
                className={styles.create}
                type='button'
                onClick={handleCreateCategory}
              >
                Criar Categoria
                <FiSave size={24} />
              </button>
            </form>

            <h2>Categorias Criadas</h2>
            <section className={styles.categories}>
              {categories.map((category) => (
                <div key={category.id} className={styles.category}>
                  <h3>{category.name}</h3>
                </div>
              ))}
            </section>
          </Main>
        </Content>
      </Container>
    </>
  );
};

export default Categories;
