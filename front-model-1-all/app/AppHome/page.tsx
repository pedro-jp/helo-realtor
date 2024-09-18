'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { OfficeType } from '../types'; // Tipagem dos escritórios
import MapWithCircle from '../components/mapOffices';

async function fetchOffices(): Promise<OfficeType[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/offices`);
    const data = await response.json();
    const offices = data.flatMap((user: any) => user.office); // Extrai todos os escritórios de cada usuário
    return offices;
  } catch (error) {
    console.error('Failed to fetch offices:', error);
    return [];
  }
}

const AppHome = () => {
  const [offices, setOffices] = useState<OfficeType[]>([]);

  useEffect(() => {
    async function loadOffices() {
      const data = await fetchOffices();
      setOffices(data);
    }
    loadOffices();
  }, []);

  if (offices.length === 0) {
    return <div>No offices data available.</div>;
  }

  // Mapeando as localizações dos escritórios
  const officeLocations = offices.map((office) => ({
    latitude: office.latitude.toString(),
    longitude: office.longitude.toString(),
    marker: true, // Exibir marcador
    officeName: office.name, // Nome do escritório para exibir no popup
    officeId: office.id, // ID do escritório para futura utilização
  }));

  return (
    <>
      <div style={{ marginTop: '200px' }}>
        {offices.map((office, index) => (
          <Link key={index} href={`/office/${office.url}`}>
            <div>{office.name}</div>
          </Link>
        ))}
      </div>
      <MapWithCircle locations={officeLocations} />{' '}
      {/* Passando várias localizações */}
    </>
  );
};

export default AppHome;
