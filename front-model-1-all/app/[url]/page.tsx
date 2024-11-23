// app/[url]/page.tsx
import React from 'react';
import { Metadata } from 'next';
import Cards from '../components/cards';
import Hero from '../components/hero';

import style from './style.module.scss';
import MapWithCircle from '../components/map';
import { ImovelType, OfficeType } from '@/app/types';
import { Footer } from '@/app/components/footer';
import { SubscriptionModal } from '../components/SubscriptionModal';
import Filter from '../components/Filter';

async function getOfficeByName(url: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/offices/${url}`
    );

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

export async function generateMetadata({
  params,
}: {
  params: { url: string };
}): Promise<Metadata> {
  const office = await getOfficeByName(params.url);

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
      images: [
        {
          url: `${office?.banner_image[office?.banner_index]?.url}`,
          width: 1920,
          height: 1080,
          alt: office.name,
        },
      ],
    },
  };
}

// Componente que renderiza a página
export default async function OfficePage({
  params,
}: {
  params: { url: string };
}) {
  const office = (await getOfficeByName(params.url)) as OfficeType;

  if (!office) {
    return <div>Escritório não encontrado</div>;
  }

  return (
    <>
      <div>
        <Hero url={office?.url} />
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

        <Filter url={office.url} officeId={office.id} />
        <section className={style.card_section}></section>
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
      {/* <SubscriptionModal office={office} /> */}
      <Footer url={office.url} />
    </>
  );
}
