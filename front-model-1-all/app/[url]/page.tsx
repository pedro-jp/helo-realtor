// app/[url]/page.tsx
import React from 'react';
import { Metadata } from 'next';
import Cards from '../components/cards';
import Hero from '../components/hero';

import style from './style.module.scss';
import MapWithCircle from '../components/map';
import { ImovelType } from '@/app/types';
import { Footer } from '@/app/components/footer';

async function getOfficeByName(url: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/offices/${url}`
    );
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

// Função para gerar metadata dinâmico baseado no url
export async function generateMetadata({
  params,
}: {
  params: { url: string };
}): Promise<Metadata> {
  const office = await getOfficeByName(params.url); // Busca o escritório pelo nome
  console.log('params: ' + params.url);

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
  url: string;
  latitude: string;
  longitude: string;
  imoveis: ImovelType[];
  phone: string;
};

// Componente que renderiza a página
export default async function OfficePage({
  params,
}: {
  params: { url: string };
}) {
  const office: OfficeType = await getOfficeByName(params.url);

  if (!office) {
    return <div>Escritório não encontrado</div>;
  }

  return (
    <>
      <div>
        <Hero />
        <section
          style={{
            backgroundImage: `url('/assets/img/door.jpg')`,
            height: '100vh',
          }}
          className={style.sell}
        >
          <h1>Venda seu imóvel</h1>
          <button>
            <a target='_blank' href={`https://wa.me/+55${office?.phone}`}>
              Quer vender o seu imóvel?
            </a>
          </button>
        </section>
        <h2
          style={{
            textAlign: 'center',
            margin: '20px',
          }}
        >
          Imóveis disponíveis
        </h2>
        <section className={style.card_section}>
          <Cards url={office.url} />
        </section>
        <div
          style={{
            width: 'calc(100% - 2rem)',
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
      </div>
      <Footer url={office.url} />
    </>
  );
}
