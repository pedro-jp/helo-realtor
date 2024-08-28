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

// Função para buscar os dados do imóvel por ID
async function getImovelData(id: string): Promise<ImovelType> {
  const res = await fetch(`http://192.168.1.21:3332/imovel/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

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
          url: `http://192.168.1.21:3332/files/${imovel.images[0]?.url}`,
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
      <Image
        src={`http://192.168.1.21:3332/files/${imovel.images[0]?.url}`}
        alt={imovel.name}
        width={800}
        height={600}
      />
    </div>
  );
}
