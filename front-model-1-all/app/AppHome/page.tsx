'use client';
// app/app-home/page.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '../context/appContext'; // Ajuste o caminho conforme necessário
import { OfficesType } from '../types';

async function fetchOffices(url: string): Promise<OfficesType> {
  try {
    const response = await fetch(`${url}/offices`);
    const data = await response.json();
    return { offices: data };
  } catch (error) {
    console.error('Failed to fetch offices:', error);
    return { offices: [] };
  }
}

const AppHome = () => {
  const [officesData, setOfficesData] = useState<OfficesType>({ offices: [] });

  useEffect(() => {
    async function loadOffices() {
      const data = await fetchOffices('http://localhost:3332');
      setOfficesData(data);
    }

    loadOffices();
  }, []);

  if (officesData.offices.length === 0) {
    return <div>No offices data available.</div>;
  }

  return (
    <div style={{ marginTop: '200px' }}>
      {officesData.offices.map((office, index) => (
        <Link key={index} href={`/office/${office.url}`}>
          <div>{office.url}</div>
        </Link>
      ))}
    </div>
  );
};

export default AppHome;
