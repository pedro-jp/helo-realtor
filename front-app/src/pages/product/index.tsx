import Head from 'next/head';
import styles from './style.module.scss';
import { Header } from '@/components/Header';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { Input } from '@/components/ui/Input';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';
import { AuthContext } from '@/contexts/AuthContext';

type ItemProps = {
  id: string;
  name: string;
};
interface CategoryProps {
  categoryList: ItemProps[];
}
export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);
  const { signOut } = useContext(AuthContext);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0] as any;

    if (!image) {
      return;
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  //Quando você seleciona uma nova categoria na lista
  function handleChangeCategory(event: any) {
    // console.log("POSICAO DA CATEGORIA SELECIONADA ", event.target.value)
    //console.log('Categoria selecionada ', categories[event.target.value])

    setCategorySelected(event.target.value);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData();

      if (
        name === '' ||
        price === '' ||
        description === '' ||
        imageAvatar === null
      ) {
        toast.error('Preencha todos os campos!');
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', imageAvatar);

      const apiClient = setupAPIClient(signOut);

      await apiClient.post('/product', data);

      toast.success('Cadastrado com sucesso!');
    } catch (err) {
      console.log(err);
      toast.error('Ops erro ao cadastrar!');
    }

    setName('');
    setPrice('');
    setDescription('');
    setImageAvatar(null);
    setAvatarUrl('');
  }

  return (
    <>
      <Head>
        <title>Novo produto - Pizzaria</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <h1>Novo produto</h1>

        <form onSubmit={handleRegister}>
          <label>
            <span>
              <FiUpload size={25} color='white' />
            </span>
            <input
              onChange={handleFile}
              type='file'
              accept='image/png, image/jpeg'
            />
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt='Foto do produto'
                width={250}
                height={250}
              ></Image>
            )}
          </label>

          <select value={categorySelected} onChange={handleChangeCategory}>
            {categories.map((item, index) => {
              return (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Digite o nome do produto'
          />
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type='text'
            placeholder='Digite o preço do produto'
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Descreva seu produto'
          ></textarea>
          <button type='submit'>Cadastrar</button>
        </form>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/category');

  return {
    props: {
      categoryList: response.data,
    },
  };
});
