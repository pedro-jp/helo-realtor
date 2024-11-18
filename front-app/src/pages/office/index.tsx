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
import { FiPlus, FiSave, FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Container from '@/components/Container';
import Content from '@/components/Content';
import { uploadImage } from '@/services/upload';

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

type Logo = {
  id: string;
  url: string;
};

interface Banner extends Logo {}
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
  const [background, setBackground] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileBanner, setImageFileBanner] = useState(null);
  const [logos, setLogos] = useState<Logo[]>([]);
  const [logoIndex, setLogoIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    console.log('user', user);
    if (user?.id !== '') {
      getOffice();
      if (name !== '') {
        setCreated(true);
      }
    }
  }, [user, isAuthenticated, imageFile, imageFileBanner]);

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
      setLogos(data.Office_Logo);
      setLogoIndex(data.logo_index);
      setBanners(data.banner_image);
      setBannerIndex(data.banner_index);
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

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImageFile(file);
    setBackground(URL.createObjectURL(file) as any);
  };
  const handleBannerChange = (e: any) => {
    const file = e.target.files[0];
    setImageFileBanner(file);
    setBackground(URL.createObjectURL(file) as any);
  };

  const handleAddImage = async (imgFile: File) => {
    setLoading(true);
    try {
      if (imgFile === null) {
        toast.error('Selecione uma imagem');
        setLoading(false);
        return;
      }
      await uploadImage(
        URL.createObjectURL(imgFile as any),
        id,
        router,
        'logo'
      );
      setBackground('' as any);
      toast.success('Imagem adicionada com sucesso!');
      setImageFile(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBannerImage = async (imgFile: File) => {
    setLoading(true);
    try {
      if (imgFile === null) {
        toast.error('Selecione uma imagem');
        setLoading(false);
        return;
      }
      await uploadImage(
        URL.createObjectURL(imgFile as any),
        id,
        router,
        'banner'
      );
      setBackground('' as any);
      toast.success('Imagem adicionada com sucesso!');
      setImageFileBanner(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLogo = async (index: number) => {
    setLogoIndex(index);
    try {
      const response = await api.put(`/office/${id}`, {
        name,
        phone,
        address,
        address_city,
        email,
        description,
        baner_index: bannerIndex,
        logo_index: index as number,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectBanner = async (index: number) => {
    setBannerIndex(index);
    try {
      const response = await api.put(`/office/${id}`, {
        name,
        phone,
        address,
        address_city,
        email,
        description,
        logo_index: logoIndex,
        banner_index: index as number,
      });
      console.log(bannerIndex);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>IntG Realtor | Escritório</title>
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
              <section className={styles.logos}>
                <div>
                  <h3>Galeria de logos</h3>
                  <div>
                    {logos.map((logo: Logo, index) => (
                      <div key={logo.id} className={styles.logo}>
                        <img src={logo.url} height={50} width={50} />
                        <input
                          type='radio'
                          name='logo'
                          value={index}
                          checked={logoIndex === index}
                          onChange={() => handleSelectLogo(index)}
                          className={styles.radio}
                        />
                      </div>
                    ))}
                    <div className={styles.select_group}>
                      <div className={styles.formRow}>
                        <div>
                          <Input
                            className={styles.plus}
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                          />
                          <FiPlus size={50} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3>Logo atual</h3>
                  <img
                    src={logos[logoIndex]?.url}
                    alt=''
                    height={100}
                    width={100}
                  />
                </div>
              </section>
              {id && imageFile && (
                <button
                  type='button'
                  className={styles.button}
                  onClick={() => handleAddImage(imageFile)}
                >
                  Adicionar imagem
                </button>
              )}{' '}
              <section className={styles.logos}>
                <div>
                  <h3>Galeria de banners</h3>
                  <div>
                    {banners &&
                      banners.map((banner: Banner, index) => (
                        <div key={banner.id} className={styles.logo}>
                          <img src={banner.url} height={50} width={50} />
                          <input
                            type='radio'
                            name='logo'
                            value={index}
                            checked={bannerIndex === index}
                            onChange={() => handleSelectBanner(index)}
                            className={styles.radio}
                          />
                        </div>
                      ))}
                    <div className={styles.select_group}>
                      <div className={styles.formRow}>
                        <div>
                          <Input
                            className={styles.plus}
                            type='file'
                            accept='image/*'
                            onChange={handleBannerChange}
                          />
                          <FiPlus size={50} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3>Banner atual</h3>
                  <img
                    src={banners && banners[bannerIndex]?.url}
                    alt='banner'
                    height={100}
                    width={100}
                  />
                </div>
              </section>
              {id && imageFileBanner && (
                <button
                  type='button'
                  className={styles.button}
                  onClick={() => handleAddBannerImage(imageFileBanner)}
                >
                  Adicionar imagem
                </button>
              )}{' '}
            </form>
          </Main>
        </Content>
      </Container>
    </>
  );
}
