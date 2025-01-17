import { Metadata } from 'next';
import { getImoveis } from '../services/getImoveis';
import Cards from '../components/cards';
import Hero from '../components/hero';

import style from './style.module.scss';
import Map from '../components/map';
import MapWithCircle from '../components/map';
import { getOffice } from '../services/getOffice';

export async function generateMetadata(): Promise<Metadata> {
  const imoveis = await getImoveis();
  const office = await getOffice();

  // Se houver imóveis, use o primeiro imóvel para o título e a descrição.
  const firstImovel = imoveis[0];

  return {
    title: office?.name || 'Imóveis Disponíveis',
    description: office?.description,
    openGraph: {
      title: office.name,
      description: office?.description,
      url: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
      images:
        firstImovel && firstImovel.images.length > 0
          ? [
              {
                url: `${firstImovel.images[0]?.url}`,
                width: 1920,
                height: 1080,
                alt: firstImovel.name,
              },
              {
                url: `${firstImovel.images[1]?.url}`,
                width: 1920,
                height: 1080,
                alt: firstImovel.name,
              },
              {
                url: `${firstImovel.images[2]?.url}`,
                width: 1920,
                height: 1080,
                alt: firstImovel.name,
              },
              {
                url: `${firstImovel.images[3]?.url}`,
                width: 1920,
                height: 1080,
                alt: firstImovel.name,
              },
              {
                url: `${firstImovel.images[4]?.url}`,
                width: 1920,
                height: 1080,
                alt: firstImovel.name,
              },
            ]
          : [],
    },
  };
}

export default async function Home() {
  const office = await getOffice();
  return (
    <>
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
      <section
        className={style.card_section}
        style={{
          backgroundImage: `url('/assets/patterns/image.png')`,
        }}
      >
        <Cards />
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
