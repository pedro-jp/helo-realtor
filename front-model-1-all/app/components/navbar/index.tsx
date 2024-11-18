'use client';
import Link from 'next/link';
import style from './style.module.scss';
import { api } from '@/app/services/api';
import { useEffect, useState } from 'react';

type LogoType = {
  url: string;
  id: string;
};

type OfficeType = {
  url?: string;
  phone?: string;
};
export default function Navbar({ url, phone }: OfficeType) {
  const [logos, setLogos] = useState<LogoType>({} as LogoType);
  useEffect(() => {
    getLogo();
  }, []);

  const getLogo = async () => {
    try {
      const response = await api.get(`/offices/${url}`);
      setLogos(response.data.Office_Logo[response.data.logo_index]);
      console.log(response.data);
    } catch (error) {}
  };

  return (
    <menu className={style.menu}>
      <div className={style.hamburger}>
        <input type='checkbox' name='' id='' />
      </div>
      <nav className={style.navbar}>
        <ul>
          <li>
            <img src={logos.url} alt={url} height={40} />
          </li>
        </ul>
        <ul>
          <li>
            <Link href={url ? `/${url}` : '/'}>Lista de Imóveis</Link>
          </li>
          {/* <li>
            <Link href={'/imoveis'}>Lista de Imóveis</Link>
          </li> */}
          {/* <li>Sobre</li> */}
          <li>
            <Link target='_blank' href={phone ? `https://wa.me/${phone}` : '/'}>
              Contato
            </Link>
          </li>
        </ul>
      </nav>
    </menu>
  );
}
