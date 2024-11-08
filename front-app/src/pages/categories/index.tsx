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
import { Input } from '@/components/ui/Input';
import styles from './styles.module.scss';
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';

type CategoryType = {
  id: string;
  name: string;
};

const Categories = () => {
  const { user, loading, setLoading, isAuthenticated } =
    useContext(AuthContext); // Pega o usuário logado do contexto
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const router = useRouter();
  const api = setupAPIClient(router);

  useEffect(() => {
    listCategories();
  }, [user, isAuthenticated]);

  const listCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/category/${user.id}`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
            <h2>
              {selectedCategoryId ? 'Atualizar Categoria' : 'Criar Categoria'}
            </h2>

            <form onSubmit={handleCreateCategory} className={styles.form}>
              <Input
                type='text'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder='Nome da categoria'
              />

              <button className={styles.create} type='submit'>
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
