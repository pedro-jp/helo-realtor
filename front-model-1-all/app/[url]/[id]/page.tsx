import { Carousel } from '@/app/components/Carousel';
import { getImovelData } from '@/app/services/getImoveis';
import { Metadata } from 'next';
import style from './styles.module.scss';
import dynamic from 'next/dynamic';
import { ImovelType, OfficeType } from '@/app/types';
import BtnCompartilhar from '@/app/components/BtnCompartlhar';
import { Favorite } from '@/app/assets/svg';
import Favoritar from '@/app/components/Favoritar';
import { Footer } from '@/app/components/footer';
import React from 'react';

// Importa o componente dinamicamente para evitar SSR
const MapWithCircle = dynamic(() => import('@/app/components/map'), {
  ssr: false, // Desabilita SSR para o mapa
});

// Função para gerar metadados dinamicamente
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const imovel = await getImovelData(params.id);

  return {
    title: `${imovel.name} - Imóvel Disponível`,
    description: imovel.description,
    openGraph: {
      title: imovel.name,
      description: imovel.description,
      url: `${process.env.NEXT_PUBLIC_URL}/imovel/${params.id}`,
      images: [
        {
          url: `${imovel.images[0]?.url}`,
          width: 1920,
          height: 1080,
          alt: imovel.name,
        },
        {
          url: `${imovel.images[1]?.url}`,
          width: 1920,
          height: 1080,
          alt: imovel.name,
        },
        {
          url: `${imovel.images[2]?.url}`,
          width: 1920,
          height: 1080,
          alt: imovel.name,
        },
        {
          url: `${imovel.images[3]?.url}`,
          width: 1920,
          height: 1080,
          alt: imovel.name,
        },
        {
          url: `${imovel.images[4]?.url}`,
          width: 1920,
          height: 1080,
          alt: imovel.name,
        },
      ],
    },
  };
}

async function getOffice(ownerId: string): Promise<OfficeType> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/office/${ownerId}`
  );
  const office: OfficeType = await response.json();
  return office;
}

// Componente da página do imóvel
export default async function ImovelPage({
  params,
}: {
  params: { id: string };
}) {
  const imovel: ImovelType = await getImovelData(params.id);
  function convertNewlinesToBreaks(text: string) {
    return text.replace(/\n/g, '<br />');
  }

  const transaction =
    imovel.transaction[0].toUpperCase() + imovel.transaction.slice(1);
  const office = await getOffice(imovel.ownerId);

  if (!office) {
    return <div>Imóvel não encontrado</div>;
  }

  return (
    <>
      <main className={style.main}>
        <h1>
          <span className={style.transaction}>{transaction} </span>
          {imovel.name}
        </h1>
        <section className={style.container}>
          <Carousel images={imovel.images} />
          <div>
            <Favoritar imovel={imovel} />
            <BtnCompartilhar title={imovel.name} text={imovel.description} />
          </div>

          <div>
            <ul className={style.infos}>
              <li>
                <strong>Preço: </strong>
                {imovel.price}
              </li>
              {imovel?.quartos && parseInt(imovel?.quartos) > 1 ? (
                <li>
                  <strong>Quartos: </strong>
                  <span>{imovel?.quartos}</span>
                </li>
              ) : null}

              {imovel?.banheiros && parseInt(imovel?.banheiros) > 1 && (
                <li>
                  <strong>Banheiros: </strong>
                  <span>{imovel?.banheiros}</span>
                </li>
              )}
              {imovel?.area && (
                <li>
                  <strong>Área: </strong>
                  <span>
                    {imovel.area}m<sup>2</sup>
                  </span>
                </li>
              )}
              {imovel?.garagem && parseInt(imovel?.garagem) > 1 && (
                <li>
                  <strong>Garagem: </strong>
                  <span>{imovel?.garagem} vagas</span>
                </li>
              )}
            </ul>
          </div>
        </section>
        <section className={style.description_container}>
          <div className={style.description}>
            <h2 style={{ marginBottom: '12px' }}>{imovel?.local}</h2>
            <h3 style={{ marginBottom: '12px' }}>Descricão</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: convertNewlinesToBreaks(imovel.description),
              }}
            />
          </div>
          <div className={style.map}>
            <MapWithCircle
              latitude={imovel.latitude}
              longitude={imovel.longitude}
              marker={imovel.marker}
            />
          </div>
        </section>
      </main>
      <Footer url={office?.url} />
    </>
  );
}
