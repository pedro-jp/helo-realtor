'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import style from './style.module.scss';
import { getOfficeByName } from '@/app/services/getOffice';
import { OfficeType, RealtorType } from '@/app/types';
import formatWhatsapp from '../../services/formatWhatsapp';
import { formatarNumero } from '@/app/services/formatNumber';
import { SubscriptionModal } from '../SubscriptionModal';

type Props = {
  url: string;
};
export const Footer = ({ url }: Props) => {
  const [officeData, setOfficeData] = useState<OfficeType>({} as OfficeType);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchOfficeData = async () => {
      try {
        const data = await getOfficeByName(url);
        setOfficeData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do escritório:');
      }
    };
    fetchOfficeData();
  }, []);

  const realtors = officeData?.realtors as RealtorType[];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!officeData) return <div>Carregando...</div>;

  return (
    <footer className={style.footer}>
      <div className={style.main}>
        <div className={style.main_head}>
          <h2>{officeData?.name || 'Nome do escritório'}</h2>
          <button className={style.scrollTopButton} onClick={scrollToTop}>
            ↑
          </button>
        </div>
        <div className={style.office_data}>
          {realtors &&
            realtors.map((realtor) => (
              <ul key={realtor.id}>
                <li>
                  {officeData.address} <br /> {officeData.address_city}
                </li>

                <li className={style.number}>
                  {realtor.name}:{' '}
                  <a
                    target='_blank'
                    href={formatWhatsapp(
                      realtor.phone,
                      realtor.whatsapp_message
                    )}
                  >
                    {formatarNumero(realtor.phone)}
                  </a>
                  <li>Creci: {realtor.creci}</li>
                  <li>Email: {realtor.email}</li>
                </li>
              </ul>
            ))}

          <ul className={style.navigation}>
            <li>
              <Link href='/'>Todos os escritórios</Link>
            </li>
            <li>
              <Link href={`/e/${officeData.url}`}>Lista de Imóveis</Link>
            </li>
            <li>
              <a
                target='_blank'
                href={`whatsapp://send?phone=${officeData.phone}`}
              >
                Contato
              </a>
            </li>
            <li>
              <button
                style={{ all: 'unset', cursor: 'pointer' }}
                type='button'
                onClick={() => setOpenModal(!openModal)}
              >
                Receber novidades
              </button>
            </li>
          </ul>
        </div>
      </div>
      {openModal && <SubscriptionModal office={officeData} />}
    </footer>
  );
};
