import { Carousel } from '@/app/components/Carousel';
import { getImovelData } from '@/app/services/getImoveis';
import { Metadata } from 'next';
import style from './styles.module.scss';

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
          url: 'https://firebasestorage.googleapis.com/v0/b/upload-imoveis.appspot.com/o/images%2FA5F3DC61-5A66-4FAF-866D-A9990E2208D4.png?alt=media&token=5e87c5a4-45a5-428e-b42b-870576bf9420',
          width: 630,
          height: 1200,
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
    <main className={style.main}>
      <h1>{imovel.name}</h1>
      <section className={style.container}>
        <Carousel images={imovel.images} />
        <div>
          <ul>
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
                <span>{imovel?.garagem}</span>
              </li>
            )}
          </ul>
        </div>
      </section>
      <section>
        <h2>{imovel?.local}</h2>
        <h3>Descricão</h3>
        <p>{imovel.description}</p>
      </section>
    </main>
  );
}
