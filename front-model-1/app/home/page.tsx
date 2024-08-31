import { Metadata } from 'next';
import { getImoveis } from '../services/getImoveis';
import Cards from '../components/cards';
import Hero from '../components/hero';

import style from './style.module.scss';
import Map from '../components/map';

export async function generateMetadata(): Promise<Metadata> {
  const imoveis = await getImoveis(); // Busca os imóveis

  // Se houver imóveis, use o primeiro imóvel para o título e a descrição.
  const firstImovel = imoveis[0];

  return {
    title: firstImovel
      ? `Imóveis Disponíveis - ${firstImovel.name}`
      : 'Imóveis Disponíveis',
    description:
      firstImovel?.description || 'Veja os imóveis disponíveis no HeloTech.',
    openGraph: {
      title: firstImovel
        ? `Imóveis Disponíveis - ${firstImovel.name}`
        : 'Imóveis Disponíveis',
      description:
        firstImovel?.description || 'Veja os imóveis disponíveis no HeloTech.',
      url: `${process.env.NEXT_PUBLIC_URL}/imoveis`,
      images:
        firstImovel && firstImovel.images.length > 0
          ? [
              {
                url: `${process.env.NEXT_PUBLIC_URL}/files/${firstImovel.images[0].url}`,
                width: 800,
                height: 600,
                alt: firstImovel.name,
              },
            ]
          : [],
    },
  };
}

export default async function Home() {
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
      <Cards />
      <Map />
    </>
  );
}