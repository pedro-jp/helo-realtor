// app/[officeName]/page.tsx

import { Metadata } from 'next';
import Cards from '../../components/cards';
import Hero from '../../components/hero';

import style from './style.module.scss';
import MapWithCircle from '../../components/map';
import { ImovelType } from '@/app/types';

async function getOfficeByName(url: string) {
  try {
    const response = await fetch(`http://192.168.1.21:3332/offices/${url}`);
    console.log('retorno: ' + url);

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar escritório:', error);
    return null;
  }
}

// Função para gerar metadata dinâmico baseado no officeName
export async function generateMetadata({
  params,
}: {
  params: { url: string };
}): Promise<Metadata> {
  const office = await getOfficeByName(params.url); // Busca o escritório pelo nome
  console.log('params: ' + params.url);
  console.log('nome: ' + office.name);

  if (!office) {
    return {
      title: 'Escritório não encontrado',
      description: 'Nenhum escritório foi encontrado com o nome fornecido.',
    };
  }

  return {
    title: office?.name || 'Imóveis Disponíveis',
    description: office?.description,
    openGraph: {
      title: office.name,
      description: office?.description,
      url: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
    },
  };
}

type OfficeType = {
  name: string;
  description: string;
  address: string;
  city: string;

  latitude: string;
  longitude: string;
  imoveis: ImovelType[];
};

// Componente que renderiza a página
export default async function OfficePage({
  params,
}: {
  params: { url: string };
}) {
  const office: OfficeType = await getOfficeByName(params.url);
  console.log(params);
  console.log(params.url);

  if (!office) {
    return <div>Escritório não encontrado</div>;
  }

  return (
    <>
      <div>{office.name}</div>
      <Hero />
      <section
        style={{
          backgroundImage: `url('/assets/img/door.jpg')`,
        }}
        className={style.sell}
      >
        <h1>Venda seu imóvel</h1>
        <button>
          <a href='/imoveis'>Quer vender o seu imóvel?</a>
        </button>
      </section>
      <section className={style.card_section}>
        {office.imoveis && <Cards officeName={office.name} />}
      </section>
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <MapWithCircle
          latitude={office?.latitude}
          longitude={office?.longitude}
          marker
        />
      </div>
    </>
  );
}
