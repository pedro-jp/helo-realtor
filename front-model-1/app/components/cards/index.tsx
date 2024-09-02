import { getImoveis } from '@/app/services/getImoveis';
import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.scss';

export default async function Cards() {
  const imoveis = await getImoveis();

  return (
    <>
      {imoveis.length > 0 ? (
        imoveis.map((imovel) => (
          <Link href={`/imovel/${imovel.id}`} key={imovel.id}>
            <h2>{imovel.name}</h2>
            {imovel.images && imovel.images.length > 0 && (
              <div className={styles.houseInfo}>
                <div className={styles.houseImage}>
                  <Image
                    src={imovel.images[0].url}
                    alt='House Image'
                    layout='responsive'
                    width={500}
                    height={300}
                  />
                </div>

                <div className={styles.housePrice}>
                  <span>$500,000</span>
                </div>

                <ul className={styles.houseMeta}>
                  <li>Somewhere</li>
                  <li>
                    158m<sup>2</sup>
                  </li>
                  <li>Big house</li>
                </ul>
              </div>
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
