'use client';
import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { api } from '@/app/services/api';
import { OfficeType } from '@/app/types';

type BannerType = {
  id: string;
  url: string;
};

interface Props {
  url: string;
}

export default function Hero({ url }: Props) {
  const [banner, setBanner] = useState<BannerType>({} as BannerType);

  useEffect(() => {
    getBanner();
    console.log(url);
  }, []);

  const getBanner = async () => {
    try {
      const response = await api.get(`/offices/${url}`);
      const office = response.data as OfficeType;
      setBanner(office?.banner_image[office?.banner_index]);
      console.log(office);
    } catch (error) {}
  };

  return (
    <section
      style={{ backgroundImage: `url('${banner.url}')` }}
      className={style.hero}
    >
      <h1>Encontre a casa dos seus sonhos</h1>
      <button>
        <a href=''>Me mande uma mensagem</a>
      </button>
    </section>
  );
}
