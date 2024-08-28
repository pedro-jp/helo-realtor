'use client';

import Head from 'next/head';
import Image from 'next/image';
import { useAppContext } from '../context/appContext';

export default function Home() {
  const { imoveis } = useAppContext();

  return (
    <>
      <Head>
        <title>ola</title>
      </Head>

      <div>
        {imoveis ? (
          imoveis.map((imovel) => (
            <div key={imovel.id}>
              <h2>{imovel.name}</h2>
              {imovel.images && imovel.images.length > 0 && (
                <Image
                  src={`http://192.168.1.21:3332/files/${imovel.images[0].url}`}
                  alt={imovel.name}
                  width={500}
                  height={300}
                />
              )}
            </div>
          ))
        ) : (
          <p>Nenhum imóvel encontrado</p>
        )}
      </div>
    </>
  );
}
