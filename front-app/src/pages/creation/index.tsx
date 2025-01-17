import React, { useState, useEffect, useContext, FormEvent } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Head from 'next/head';
import Container from '@/components/Container';
import Content from '@/components/Content';
import { Main } from '@/components/Main';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { setupAPIClient } from '../../services/api';
import { CategoryType, OfficeType, RealtorType } from '@/Types';
import { Input, TextArea } from '@/components/ui/Input';
import { uploadImage } from '@/services/upload';
import styles from './styles.module.scss';
import inputStyle from '../../styles/input.module.scss';
import { FiDelete, FiPlus, FiTrash, FiUpload } from 'react-icons/fi';
import { FiSave } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import CurrencyInput from 'react-currency-input-field';

const Creation = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const router = useRouter();
  const api = setupAPIClient(router);
  const [imagesUri, setImagesUri] = useState<string[]>([]);

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
  const [categoryList, setCategoryList] = useState<CategoryType[]>();
  const [categoryId, setCategoryId] = useState('');
  const [office, setOffice] = useState<OfficeType>();
  const [realtorList, setRealtorList] = useState<RealtorType[]>();
  const [realtorId, setRealtorId] = useState('');
  const [imagesFiles, setImagesFiles] = useState<FileList>({} as FileList);

  const [background, setBackground] = useState();
  const [propertyId, setPropertyId] = useState('');

  const [displayValue, setDisplayValue] = useState('');

  const [isImovelCreated, setIsImovelCreated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || loading) return;
    if (!user.planIsActive)
      toast.warning('Ative um plano para cadastrar um imóvel');
    fetchCategories();
    fetchOffice();
  }, [isAuthenticated, loading]);

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
    } catch (error) {
      console.error(error);
      console.error('Erro ao carregar escritório');
    }
  }

  const formatToBRL = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9]/g, '')) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numericValue);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(formatToBRL(value));
  };

  // Função para lidar com o upload de imagem
  const handleImageChange = (e: any) => {
    const file = e.target.files;
    setImagesFiles(file);
  };

  // Função para criar o imóvel
  const handleCreateImovel = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!office) return;

    try {
      // Formata o preço
      const numericPrice = parseFloat(
        displayValue.replace('R$', '').replace('.', '').replace(',', '.')
      );

      // Cria o imóvel
      const response = await api.post('/imovel', {
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
      setPropertyId(imovelId);
      setIsImovelCreated(true);

      if (propertyId && imagesFiles !== null) {
        handleAddImage();
      }
      toast.success('Imóvel criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar imóvel:', error);
      toast.error('Erro ao criar imóvel.');
    } finally {
      setIsLoading(false);
      setBackground('' as any);
      setImagesFiles({} as FileList);
    }
  };

  const handleAddImage = async () => {
    setIsLoading(true);
    try {
      if (imagesFiles.length === 0) {
        toast.error('Selecione uma imagem');
        setIsLoading(false);
        return;
      }

      for (const file of Array.from(imagesFiles)) {
        await uploadImage(
          URL.createObjectURL(file) as any,
          propertyId,
          router,
          'imovel_image'
        );
      }

      toast.success('Imagens adicionadas com sucesso!');
      setBackground('' as any);
      setImagesFiles({} as FileList);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Head>
        <title>IntG Realtor | Criação de Imóvel</title>
      </Head>
      <Sidebar />
      <Content>
        <Header>Criação de Imóvel</Header>
        <Main>
          {/*  */}
          {office && categoryList && realtorList && !isImovelCreated ? (
            <form className={styles.form} onSubmit={handleCreateImovel}>
              {!isImovelCreated && (
                <button
                  className={isLoading ? styles.loading : styles.create}
                  disabled={isLoading}
                  type='submit'
                >
                  {isLoading ? '' : 'Criar imóvel'}
                  {isLoading ? (
                    <FaSpinner className={styles.spinner} size={20} />
                  ) : (
                    <FiSave />
                  )}
                </button>
              )}

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
                    placeholder='Quantidade de quartos '
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
                    {categoryList?.map((category: CategoryType) => (
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
                    {realtorList?.map((realtor: RealtorType) => (
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
                {/* <div style={{ width: '100%' }} className={styles.formRow}>
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
                </div> */}
              </div>
              {/* {propertyId && imageFile && (
                <button
                  type='button'
                  className={styles.button}
                  onClick={handleAddImage}
                >
                  Adicionar imagem
                </button>
              )} */}
              {propertyId && (
                <button
                  className={styles.button}
                  onClick={() =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_ALL_URL}/${office?.url}/${propertyId}`
                    )
                  }
                >
                  Ver imóvel
                </button>
              )}
            </form>
          ) : (
            <>
              {isImovelCreated && (
                <form
                  style={{ width: '100%', height: '500px' }}
                  className={styles.form}
                  onSubmit={handleCreateImovel}
                >
                  {!isImovelCreated && (
                    <button
                      className={isLoading ? styles.loading : styles.create}
                      disabled={isLoading}
                      type='submit'
                    >
                      {isLoading ? '' : 'Criar imóvel'}
                      {isLoading ? (
                        <FaSpinner className={styles.spinner} size={20} />
                      ) : (
                        <FiSave />
                      )}
                    </button>
                  )}

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
                    >
                      {imagesFiles.length > 0
                        ? 'Adicionar imagens'
                        : 'Adicionar imagem'}
                    </button>
                  )}
                  {propertyId && (
                    <button
                      className={styles.button}
                      onClick={() =>
                        router.push(
                          `${process.env.NEXT_PUBLIC_ALL_URL}/e/${office?.url}/${propertyId}`
                        )
                      }
                    >
                      Ver imóvel
                    </button>
                  )}
                </form>
              )}
            </>
          )}
        </Main>
      </Content>
    </Container>
  );
};

export default Creation;
