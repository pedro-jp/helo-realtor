'use client';
import React, { useEffect } from 'react';
import { getImoveis } from '@/app/services/getImoveis';
import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.scss';
import { FaInfoCircle } from 'react-icons/fa';
import { ImovelType } from '@/app/types';

interface PageProps {
  url: string;
  imoveis: ImovelType[];
}

export default function Cards({ imoveis, url }: PageProps) {
  // const imoveis = await getImoveis(url);

  function formatarPrecoReal(numero: number) {
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <>
      {imoveis &&
        imoveis.length > 0 &&
        imoveis?.map((imovel) => (
          <React.Fragment key={imovel.id}>
            <div className={styles.houseInfo}>
              <div className={styles.houseImage}>
                <Link href={`/${url}/${imovel.id}`}>
                  <FaInfoCircle className={styles.houseIcon} />
                </Link>
                <Image
                  src={
                    imovel.images.length > 0
                      ? imovel.images[0].url
                      : 'https://placehold.co/500x300'
                  }
                  alt='House Image'
                  width={500}
                  height={500}
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
          </React.Fragment>
        ))}
    </>
  );
}
