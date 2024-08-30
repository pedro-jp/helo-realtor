import { getImoveis } from '@/app/services/getImoveis';
import Image from 'next/image';
import Link from 'next/link';

export default async function Cards() {
  const imoveis = await getImoveis();

  return (
    <>
      {imoveis.length > 0 ? (
        imoveis.map((imovel) => (
          <Link href={`/imovel/${imovel.id}`} key={imovel.id}>
            <h2>{imovel.name}</h2>
            {imovel.images && imovel.images.length > 0 && (
              <Image
                src={`${process.env.NEXT_PUBLIC_URL}/files/${imovel.images[0].url}`}
                alt={imovel.name}
                width={500}
                height={300}
              />
            )}
            <p>{imovel.description}</p>
          </Link>
        ))
      ) : (
        <p>Nenhum imóvel encontrado</p>
      )}
    </>
  );
}
