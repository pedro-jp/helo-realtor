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
import inputStyle from '../../../styles/input.module.scss';
import { FiPlus, FiUpload } from 'react-icons/fi';
import { FiSave } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import CurrencyInput from 'react-currency-input-field';

const Creation = () => {
  const { user, loading, setLoading, isAuthenticated } =
    useContext(AuthContext);
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
    url: ''
  });
  const [realtorList, setRealtorList] = useState([]);
  const [realtorId, setRealtorId] = useState('');
  const [imagesFiles, setImagesFiles] = useState<FileList>({} as FileList);
  const [propertyId, setPropertyId] = useState('');
  const [rawValue, setRawValue] = useState(0); // valor numérico sem formatação
  const [displayValue, setDisplayValue] = useState(''); // valor formatado para exibição

  const [background, setBackground] = useState();

  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || loading) return;
    if (!user.planIsActive)
      toast.warning('Ative um plano para atualizar um imóvel');
    ownerVerification();
    if (isMine) {
      fetchCategories();
      fetchImovel();
      fetchOffice();
      console.log('isMine', isMine);
    }
  }, [isAuthenticated, user, isMine]);

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
      setLoading(true);
      const response = await api.get(`/office/${user.id}`);
      setOffice(response.data);
      setRealtorList(response.data.realtors);
      console.log('REPONSE', response.data);
    } catch (error) {
      console.error(error);
      console.error('Erro ao carregar escritório');
    } finally {
      setLoading(false);
    }
  }

  async function ownerVerification() {
    try {
      const response = await api.get(`/imovel/${router.query.id}`);
      if (response.data.ownerId !== user.id) {
        toast.error('Este imóvel não foi criado por você');
        setIsMine(false);
      } else {
        setIsMine(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchImovel = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/imovel/${router.query.id}`);
      setName(response.data.name);
      setPropertyId(response.data.id);
      setDescription(response.data.description);
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
      setDisplayValue(response.data.price);
    } catch (error) {
      console.error(error);
      console.error('Erro ao carregar imóvel');
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com o upload de imagem
  const handleImageChange = (e: any) => {
    const file = e.target.files;
    setImagesFiles(file);
  };

  // Função para criar o imóvel
  const handleEditImovel = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!office) return;

    try {
      setLoading(true);
      // Formata o preço
      const numericPrice = parseFloat(
        displayValue.replace('R$', '').replace('.', '').replace(',', '.')
      );
      console.log(numericPrice);

      // Cria o imóvel
      const response = await api.put(`/imovel/${router.query.id}/${user.id}`, {
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
        transaction
      });

      const imovelId = response.data.id;

      // Faz upload da imagem se houver uma
      if (imagesFiles) {
        // Substitui o upload local pelo upload no Firebase
        Array.from(imagesFiles).forEach(async (file) => {
          await uploadImage(
            URL.createObjectURL(file) as any,
            imovelId,
            router,
            'imovel_image'
          );
        });
      }
      toast.success('Imóvel atualizado com sucesso!');
      router.push(
        `${process.env.NEXT_PUBLIC_ALL_URL}/e/${office.url}/${imovelId}`
      );
    } catch (error) {
      console.error('Erro ao atualizar o imóvel:', error);
      toast.error('Erro ao atualizar o imóvel.');
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };
  const handleAddImage = async () => {
    setIsLoading(true);
    if (imagesFiles.length <= 0) {
      toast.error('Selecione uma imagem');
      setIsLoading(false);
      return;
    }
    try {
      setLoading(true);
      Array.from(imagesFiles).forEach(async (file) => {
        await uploadImage(
          URL.createObjectURL(file) as any,
          propertyId,
          router,
          'imovel_image'
        );
      });
      toast.success('Imagens adicionadas com sucesso!');
      setImagesFiles({} as FileList);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Head>
        <title>IntG Realtor | Edição de Imóvel</title>
      </Head>
      <Sidebar />
      <Content>
        <Header>{name}</Header>
        <Main>
          <form className={styles.form} onSubmit={handleEditImovel}>
            <button
              className={isLoading ? styles.loading : styles.create}
              disabled={isLoading}
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
                <label className={styles.switch_marker}>
                  <input
                    type='checkbox'
                    checked={marker}
                    onChange={() => setMarker(!marker)}
                  />
                  <div>{marker ? 'SIM' : 'NÃO'}</div>
                </label>
              </div>
              <div className={styles.formRow}>
                <label>Nome:</label>
                <Input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder='Nome do imóvel'
                />
              </div>
              <div className={styles.formRow}>
                <label>Área (m²):</label>
                <Input
                  type='number'
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                  placeholder='Área do imóvel'
                />
              </div>
              <div className={styles.formRow}>
                <label>Preço:</label>
                <CurrencyInput
                  className={inputStyle.styled_input}
                  value={displayValue}
                  allowDecimals
                  decimalsLimit={2}
                  placeholder='R$ 0,00'
                  prefix='R$ '
                  onValueChange={(value, name, values) =>
                    setDisplayValue(value as string)
                  }
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
                  placeholder='Local do imóvel'
                />
              </div>
              <div className={styles.formRow}>
                <label>Quartos:</label>
                <Input
                  type='number'
                  value={quartos}
                  onChange={(e) => setQuartos(e.target.value)}
                  required
                  placeholder='Quantidade de quartos'
                />
              </div>
              <div className={styles.formRow}>
                <label>Banheiros:</label>
                <Input
                  type='number'
                  value={banheiros}
                  onChange={(e) => setBanheiros(e.target.value)}
                  required
                  placeholder='Quantidade de banheiros'
                />
              </div>
              <div className={styles.formRow}>
                <label>Garagem:</label>
                <Input
                  type='number'
                  value={garagem}
                  onChange={(e) => setGaragem(e.target.value)}
                  required
                  placeholder='Quantidade de vagas'
                />
              </div>

              <div className={styles.formRow}>
                <label>Descrição:</label>
                <TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder='Descrição do imóvel'
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
            </div>
          </form>
          <div
            className={styles.imageContainer}
            style={{
              height: imagesFiles.length > 0 ? '100%' : '100px'
            }}
          >
            <div style={{ width: '100%', height: '100%' }}>
              <div className={styles.imageInput}>
                <picture>
                  {imagesFiles.length > 0 &&
                    Array.from(imagesFiles).map((image, index) => (
                      <React.Fragment key={index}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt='Imagem'
                          onDoubleClick={() => {
                            // Atualizando o estado ao remover a imagem
                            const updatedImages = Array.from(
                              imagesFiles
                            ).filter((_, i) => i !== index);
                            const fileList = new DataTransfer();
                            updatedImages.forEach((file) =>
                              fileList.items.add(file)
                            );
                            setImagesFiles(fileList.files); // Atualiza o estado
                          }}
                        />
                      </React.Fragment>
                    ))}
                </picture>

                <Input
                  className={styles.selectImage}
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  multiple
                  name='images'
                />
                <div className={styles.selectImageLabel}>
                  <label>Selecione as imagens</label>
                  <FiPlus
                    style={{
                      cursor: 'pointer',
                      zIndex: 3,
                      marginTop: -4
                    }}
                    size={30}
                  />
                </div>
              </div>
            </div>
          </div>
          {propertyId && imagesFiles.length > 0 && (
            <button
              type='button'
              className={styles.button}
              onClick={handleAddImage}
              style={{ marginBottom: '2rem' }}
            >
              {Array.from(imagesFiles).length > 0
                ? 'Adicionar imagens'
                : 'Adicionar imagem'}
            </button>
          )}
          {propertyId && (
            <button
              type='button'
              className={styles.button}
              onClick={() =>
                router.push(
                  `${process.env.NEXT_PUBLIC_ALL_URL}/e/${office.url}/${propertyId}`
                )
              }
            >
              Ver imóvel
            </button>
          )}
        </Main>
      </Content>
    </Container>
  );
};

export default Creation;
