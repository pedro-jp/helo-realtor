'use client';
import React, { useRef, useEffect } from 'react';
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
  const [modalOpenId, setModalOpenId] = React.useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const priceRefs = useRef<(HTMLSpanElement | null)[]>([]);

  function formatarPrecoReal(numero: number) {
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setModalOpenId(null); // Fecha o modal ao pressionar ESC
    }
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    // Verifica se o clique foi fora do modal
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalOpenId(null); // Fecha o modal
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const whatType = (transactionType: string) => {
    switch (transactionType) {
      case 'locacao':
        return 'Locação';
      case 'venda':
        return 'Venda';
      default:
        return 'Todos';
    }
  };

  const whatColor = (transactionType: string) => {
    let color = '';
    switch (transactionType) {
      case '':
        color = '';
        break;
      case 'locacao':
        color = '#5C8A72';
        break;
      case 'venda':
        color = '#7D6F8A';
        break;
      default:
        break;
    }
    return color;
  };

  const fontSize = (value: number) => {
    if (priceRefs?.current[value]?.textContent?.length) {
      if (priceRefs?.current[value]?.textContent?.length <= 9) return '1rem';
      if (priceRefs?.current[value]?.textContent?.length <= 12) return '0.8rem';
      if (priceRefs?.current[value]?.textContent?.length <= 15) return '0.8rem';
      if (priceRefs?.current[value]?.textContent?.length <= 18) return '0.7rem';
      if (priceRefs?.current[value]?.textContent?.length <= 21) return '0.6rem';
      if (priceRefs?.current[value]?.textContent?.length <= 36) return '0.5rem';
    }
  };

  return (
    <>
      {imoveis &&
        imoveis.length > 0 &&
        imoveis.map((imovel, index) => (
          <React.Fragment key={imovel.id}>
            {/* Modal com referência para detectar cliques fora */}
            <div
              className={styles.modal}
              style={
                modalOpenId === imovel.id ? { scale: '1' } : { scale: '0' }
              }
              onClick={handleOutsideClick} // Detecta clique fora do modal
            >
              <span onClick={() => setModalOpenId(null)}>x</span>
              <div
                ref={modalRef} // Referência para o conteúdo do modal
                className={styles.modalContent}
              >
                <div>
                  <h3>{imovel.name}</h3>
                  <div>
                    <h4>Descrição</h4>
                    <p>{imovel.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.houseInfo}>
              <div className={styles.houseImage}>
                <FaInfoCircle
                  className={styles.houseIcon}
                  onClick={() => setModalOpenId(imovel.id)}
                />
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
                <div className={styles.houseTypeContainer}>
                  <div
                    className={styles.houseType}
                    style={{ backgroundColor: whatColor(imovel.transaction) }}
                  >
                    {whatType(imovel.transaction)}
                  </div>
                </div>
              </div>

              <div className={styles.housePrice}>
                <span
                  ref={(el) => {
                    priceRefs.current[index] = el;
                    return;
                  }}
                  style={{ fontSize: fontSize(index) }}
                >
                  {formatarPrecoReal(parseFloat(imovel.price))}
                </span>
              </div>

              <ul className={styles.houseMeta}>
                <li>{imovel.local}</li>
                {imovel.quartos && Number(imovel.quartos) > 0 && (
                  <li>{imovel.quartos} Quartos</li>
                )}
                <li>
                  {imovel.area} m<sup>2</sup>
                </li>

                <li>
                  <Link
                    style={{ textDecoration: 'underline' }}
                    href={`/${url}/${imovel.id}`}
                  >
                    Ver propriedade
                  </Link>
                </li>
              </ul>
            </div>
          </React.Fragment>
        ))}
    </>
  );
}
