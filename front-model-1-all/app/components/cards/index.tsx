import { getImoveis } from '@/app/services/getImoveis';
import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.scss';
import { FaInfoCircle } from 'react-icons/fa';
import { Imagem } from '../Image';

export default async function Cards(name: any) {
  const imoveis = await getImoveis(name);
  function formatarPrecoReal(numero: number) {
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <>
      {imoveis.map((imovel) => (
        <>
          <div>oi</div>
          {imovel.images && imovel.images.length > 0 && (
            <div className={styles.houseInfo} key={imovel.id}>
              <div className={styles.houseImage}>
                <Link href={`/imovel/${imovel.id}`}>
                  <FaInfoCircle className={styles.houseIcon} />
                </Link>
                <Imagem id={imovel.id} />
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
      ))}
    </>
  );
}
