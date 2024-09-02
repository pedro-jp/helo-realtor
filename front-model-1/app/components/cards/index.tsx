import { getImoveis } from '@/app/services/getImoveis';
import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.scss';
import { FaInfoCircle } from 'react-icons/fa';

export default async function Cards() {
  const imoveis = await getImoveis();
  function formatarPrecoReal(numero: number) {
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <>
      {imoveis.length > 0 ? (
        imoveis.map((imovel) => (
          <>
            {imovel.images && imovel.images.length > 0 && (
              <div className={styles.houseInfo} key={imovel.id}>
                <div className={styles.houseImage}>
                  <Link href={`/imovel/${imovel.id}`}>
                    <FaInfoCircle className={styles.houseIcon} />
                  </Link>
                  <Image
                    src={imovel.images[0].url}
                    alt='House Image'
                    layout='responsive'
                    width={500}
                    height={300}
                  />
                </div>

                <div className={styles.housePrice}>
                  <span>{formatarPrecoReal(parseFloat(imovel.price))}</span>
                </div>

                <ul className={styles.houseMeta}>
                  <li>{imovel.local}</li>
                  <li>{imovel.quartos} quartos</li>
                  <li>
                    {imovel.area}
                    <sup>2</sup>
                  </li>
                </ul>
              </div>
            )}
          </>
        ))
      ) : (
        <p>Nenhum imóvel encontrado</p>
      )}
    </>
  );
}
