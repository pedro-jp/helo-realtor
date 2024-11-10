// app/[officeName]/page.tsx
import React from 'react';
import { Metadata } from 'next';
import Cards from '../components/cards';
import Hero from '../components/hero';
import style from './style.module.scss';
import MapWithCircle from '../components/map';
import { ImovelType } from '@/app/types';
import { Footer } from '@/app/components/footer';
import { NextRequest } from 'next/server';

// Função para buscar o nome do escritório a partir do subdomínio ou parâmetro
async function getOfficeByName(officeName: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/offices/${officeName}`
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

// Função para capturar o nome do escritório a partir do subdomínio
function getOfficeName(params: { officeName: string }, req: NextRequest) {
  const host = req.headers.get('host');
  const subdomain = host?.split('.')[0]; // Extrai o subdomínio
  return subdomain && subdomain !== 'imoveis' ? subdomain : params.officeName;
}

// Função para gerar metadados dinâmicos baseados no nome do escritório
export async function generateMetadata({
  params,
  req,
}: {
  params: { officeName: string };
  req: NextRequest;
}): Promise<Metadata> {
  const officeName = getOfficeName(params, req);
  const office = await getOfficeByName(officeName);

  if (!office) {
    return {
      title: 'Escritório não encontrado',
      description: 'Nenhum escritório foi encontrado com o nome fornecido.',
    };
  }

  return {
    title: office.name || 'Imóveis Disponíveis',
    description: office.description,
    openGraph: {
      title: office.name,
      description: office.description,
      url: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
    },
  };
}

// Tipo do escritório
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

// Componente da página
export default async function OfficePage({
  params,
  req,
}: {
  params: { officeName: string };
  req: NextRequest;
}) {
  const officeName = getOfficeName(params, req);
  const office: OfficeType = await getOfficeByName(officeName);

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
            <a target='_blank' href={`https://wa.me/+55${office.phone}`}>
              Quer vender o seu imóvel?
            </a>
          </button>
        </section>
        <h2 style={{ textAlign: 'center', margin: '20px' }}>
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
            latitude={office.latitude}
            longitude={office.longitude}
            marker
          />
        </div>
      </div>
      <Footer url={office.url} />
    </>
  );
}
