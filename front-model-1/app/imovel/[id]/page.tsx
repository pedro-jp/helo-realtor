import { getImovelData } from '@/app/services/getImoveis';
import { Metadata } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

type ImovelType = {
  name: string;
  description: string;
  images: {
    url: string;
  }[];
  id: string;
  price: string;
  local: string;
  quartos: string;
  banheiros: string;
  area: string;
  garagem: string;
  categoryId: string;
  active: boolean;
};

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
          url: imovel.images[0]?.url,
          width: 800,
          height: 600,
          alt: imovel.name,
        },
      ],
    },
  };
}

// Componente da página do imóvel
export default async function ImovelPage({
  params,
}: {
  params: { id: string };
}) {
  const imovel: ImovelType = await getImovelData(params.id);

  return (
    <div>
      <h1>{imovel.name}</h1>
      <p>{imovel.description}</p>
      {imovel.images.map((image) => (
        <Image
          key={image.url}
          src={image.url}
          alt={imovel.name}
          width={500}
          height={500}
        />
      ))}
    </div>
  );
}
