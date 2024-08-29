'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import style from './style.module.scss';
import { getOffice } from '@/app/services/getOffice';
import { OfficeType, RealtorType } from '@/app/types';
import formatWhatsapp from '../../services/formatWhatsapp';

export const Footer = () => {
  const [officeData, setOfficeData] = useState<OfficeType>({} as OfficeType);

  useEffect(() => {
    const fetchOfficeData = async () => {
      try {
        const data = await getOffice();
        setOfficeData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do escritório:', error);
      }
    };

    fetchOfficeData();
  }, []);

  const realtors = officeData?.realtors as RealtorType[];
  console.log(officeData);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={style.footer}>
      <div className={style.main}>
        <div className={style.main_head}>
          <h2>{officeData.name || 'Nome do escritório'}</h2>
          <button className={style.scrollTopButton} onClick={scrollToTop}>
            ↑
          </button>
        </div>
        <div className={style.office_data}>
          <ul>
            <li>{officeData.name}</li>
            <li>{officeData.location}</li>
          </ul>
          {realtors &&
            realtors.map((realtor) => (
              <ul key={realtor.id}>
                <li>{realtor.name}</li>
                <li>{realtor.email}</li>
                <li>
                  <a
                    target='_blank'
                    href={formatWhatsapp(
                      realtor.phone,
                      realtor.whatsapp_message
                    )}
                  >
                    {realtor.phone}
                  </a>
                </li>
              </ul>
            ))}

          <ul className={style.navigation}>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/imoveis'>Lista de Imóveis</Link>
            </li>
            <li>Sobre</li>
            <li>Contato</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
