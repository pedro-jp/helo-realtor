/*eslint-disable*/
import { OrbitControls, ScrollControls } from '@react-three/drei';
import { Office } from './Office';
import { Content } from '../AppHome/page';
import { OfficeType } from '../types/index';
import { useEffect, useState } from 'react';

export const Experience = () => {
  const [loading, setLoading] = useState(false);
  const [offices, setOffices] = useState<OfficeType[]>([]);

  async function fetchOffices(): Promise<OfficeType[]> {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/offices`);
      const data = await response.json();
      const offices = data.flatMap((user: any) => user.office);
      return offices;
    } catch (error) {
      console.error('Failed to fetch offices:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadOffices() {
      const data = await fetchOffices();
      setOffices(data);
    }
    loadOffices();
  }, []);

  const officeLocations = offices
    .filter((office) => office.latitude && office.longitude) // Certifica-se de que há lat/lon válidos
    .map((office) => ({
      latitude: office.latitude.toString(),
      longitude: office.longitude.toString(),
      marker: true,
      officeName: office.name,
      officeId: office.id,
    }));
  return (
    <>
      <ambientLight intensity={1.4} />
      <OrbitControls enableZoom={false} />
      <ScrollControls pages={3} damping={0.25}>
        <Office officeLocations={officeLocations} />
        <Content offices={offices} officeLocations={officeLocations} />
      </ScrollControls>
    </>
  );
};
