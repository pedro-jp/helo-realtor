import React, { useState, useEffect, useContext, FormEvent } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Head from 'next/head';
import Container from '@/components/Container';
import Content from '@/components/Content';
import { Main } from '@/components/Main';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { setupAPIClient } from '../../../services/api';
import { CategoryType, OfficeType, RealtorType } from '@/Types';
import { Input, TextArea } from '@/components/ui/Input';
import { uploadImage } from '@/services/upload';
import styles from './styles.module.scss';
import { FiUpload } from 'react-icons/fi';
import { FiSave } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';

const Creation = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const api = setupAPIClient(router);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [local, setLocal] = useState('');
  const [area, setArea] = useState('');
  const [quartos, setQuartos] = useState('');
  const [banheiros, setBanheiros] = useState('');
  const [garagem, setGaragem] = useState('');
  const [marker, setMarker] = useState(false);
  const [transaction, setTransaction] = useState('venda');

  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [office, setOffice] = useState<OfficeType>({
    id: '',
    name: '',
    phone: '',
    address: '',
    address_city: '',
    email: '',
    description: '',
    url: '',
  });
  const [realtorList, setRealtorList] = useState([]);
  const [realtorId, setRealtorId] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const [background, setBackground] = useState();

  useEffect(() => {
    if (!user.planIsActive)
      toast.warning('Ative um plano para cadastrar um imóvel');
    fetchImovel();
    fetchCategories();
    fetchOffice();
  }, []);

  // Função para buscar categorias da API
  async function fetchCategories() {
    try {
      const response = await api.get(`/category/${user.id}`);
      setCategoryList(response.data);
    } catch (error) {
      console.error(error);
      console.error('Erro ao carregar categorias');
    }
  }

  // Função para buscar corretores da API
  async function fetchOffice() {
    try {
      const response = await api.get(`/office/${user.id}`);
      setOffice(response.data);
      setRealtorList(response.data.realtors);
      console.log('REPONSE', response.data);
    } catch (error) {
      console.error(error);
      console.error('Erro ao carregar escritório');
    }
  }

  const fetchImovel = async () => {
    try {
      const response = await api.get(`/imovel/${router.query.id}`);
      setName(response.data.name);
      setDescription(response.data.description);
      setPrice(`R$ ${response.data.price}`);
      setLocal(response.data.local);
      setArea(response.data.area);
      setQuartos(response.data.quartos);
      setBanheiros(response.data.banheiros);
      setGaragem(response.data.garagem);
      setMarker(response.data.marker);
      setTransaction(response.data.transaction);
      setCategoryId(response.data.categoryId);
      setRealtorId(response.data.realtorId);
      setBackground(response.data.url);
    } catch (error) {
      console.error(error);
      console.error('Erro ao carregar imóvel');
    }
  };

  // Função para lidar com o upload de imagem
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImageFile(file);
    setBackground(URL.createObjectURL(file) as any);
  };

  // Função para criar o imóvel
  const handleCreateImovel = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!office) return;

    try {
      // Formata o preço
      const numericPrice = parseFloat(
        price.replace('R$', '').replace('.', '').replace(',', '.')
      );

      // Cria o imóvel
      const response = await api.put('/imovel', {
        name,
        description,
        price: numericPrice,
        categoryId,
        local,
        quartos: parseInt(quartos),
        banheiros: parseInt(banheiros),
        area: parseInt(area),
        garagem: parseInt(garagem),
        active: true,
        ownerId: user.id,
        officeId: office.id,
        realtorId,
        marker,
        transaction,
      });

      const imovelId = response.data.id;

      // Faz upload da imagem se houver uma
      if (imageFile) {
        // Substitui o upload local pelo upload no Firebase
        await uploadImage(URL.createObjectURL(imageFile), imovelId, router);
      }
      toast.success('Imóvel criado com sucesso!');
      router.push(
        `${process.env.NEXT_PUBLIC_ALL_URL}/${office.url}/${imovelId}`
      );
    } catch (error) {
      console.error('Erro ao criar imóvel:', error);
      toast.error('Erro ao criar imóvel.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Head>
        <title>Helo Realtor | Criação de Imóvel</title>
      </Head>
      <Sidebar />
      <Content>
        <Header>{name}</Header>
        <Main>
          <form className={styles.form} onSubmit={handleCreateImovel}>
            <button
              className={isLoading ? styles.loading : styles.create}
              disabled
              type='submit'
            >
              {isLoading ? '' : 'Editar imóvel'}
              {isLoading ? (
                <FaSpinner className={styles.spinner} size={20} />
              ) : (
                <FiSave />
              )}
            </button>
            <div className={styles.formContainer}>
              <div className={styles.formRow}>
                <label>Marcador:</label>
                <label className={styles.switch}>
                  <input
                    type='checkbox'
                    checked={marker}
                    onChange={() => setMarker(!marker)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.formRow}>
                <label>Nome:</label>
                <Input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <label>Área (m²):</label>
                <Input
                  type='number'
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <label>Preço:</label>
                <Input
                  type='text'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <label>Local:</label>
                <Input
                  type='text'
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <label>Quartos:</label>
                <Input
                  type='number'
                  value={quartos}
                  onChange={(e) => setQuartos(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <label>Banheiros:</label>
                <Input
                  type='number'
                  value={banheiros}
                  onChange={(e) => setBanheiros(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <label>Garagem:</label>
                <Input
                  type='number'
                  value={garagem}
                  onChange={(e) => setGaragem(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <label>Descrição:</label>
                <TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.select_group}>
              <div className={styles.formRow}>
                <label>Categoria:</label>
                <select
                  value={categoryId}
                  onChange={(e: any) => setCategoryId(e.target.value)}
                  required
                >
                  <option value=''>Selecione</option>
                  {categoryList.map((category: CategoryType) => (
                    <option key={category.id} value={category.id.toString()}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Corretor:</label>
                <select
                  value={realtorId}
                  onChange={(e) => setRealtorId(e.target.value)}
                  required
                >
                  <option value=''>Selecione</option>
                  {realtorList.map((realtor: RealtorType) => (
                    <option key={realtor.id} value={realtor.id}>
                      {realtor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Transação:</label>
                <select
                  value={transaction}
                  onChange={(e) => setTransaction(e.target.value)}
                  required
                >
                  <option value='venda'>Venda</option>
                  <option value='locacao'>Locação</option>
                </select>
              </div>
              <div style={{ width: '100%' }} className={styles.formRow}>
                <label>Imagem:</label>

                <div
                  style={{
                    backgroundImage: background ? `url(${background})` : '',
                  }}
                >
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                  />
                  <FiUpload size={50} />
                </div>
              </div>
            </div>
          </form>
        </Main>
      </Content>
    </Container>
  );
};

export default Creation;
