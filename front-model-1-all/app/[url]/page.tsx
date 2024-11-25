// app/[url]/page.tsx
import React from 'react';
import { Metadata } from 'next';
import Hero from '../components/hero';
import style from './style.module.scss';
import MapWithCircle from '../components/map';
import { OfficeType } from '@/app/types';
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
    console.error('Erro ao buscar escritório:');
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
    icons: {
      icon: [
        {
          url: office?.Office_Logo[office.logo_index]?.url || '/favicon.ico',
          sizes: '16x16',
        },
        {
          url: office?.Office_Logo[office.logo_index]?.url || '/favicon.ico',
          sizes: '32x32',
        },
        {
          url: office?.Office_Logo[office.logo_index]?.url || '/favicon.ico',
          sizes: '48x48',
        },
      ],
      apple: office?.Office_Logo[office.logo_index]?.url || '/favicon.ico',
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
      <div className={style.container}>
        <Hero url={office?.url} />
        <div className={style.filters_cards_container}>
          <Filter url={office.url} officeId={office.id} />
        </div>
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
