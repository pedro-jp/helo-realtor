'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

type DataProps = {
  name: string;
  id: string;
  images: { url: string }[];
};

export default function Home() {
  const [data, setData] = useState<DataProps[]>([]);
  const IMAGE_URL = 'http://192.168.1.6:3332/files';

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function getData() {
    const response = await axios.get('http://192.168.1.6:3332/imoveis', {
      params: {
        ownerId: '8b06fc1e-ba36-4a48-9493-6cccad749a75',
      },
    });

    setData(response.data);
  }

  function handleShowData() {
    console.log(data);
  }

  return (
    <main>
      {data &&
        data.map((item) => {
          return (
            <div key={item?.id}>
              <h1>{item?.name}</h1>
              <Image
                width={100}
                height={100}
                src={`${IMAGE_URL}/${item?.images[0]?.url}`}
                alt={item?.name}
              />

              <button
                style={{ width: '100px', height: '100px' }}
                onClick={handleShowData}
              ></button>
            </div>
          );
        })}
    </main>
  );
}
