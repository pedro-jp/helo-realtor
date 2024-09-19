'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { OfficeType } from '../types';
import MapWithCircle from '../components/mapOffices';
import style from './styles.module.scss';
import { Loading } from '../components/Loading';
import { Canvas } from '@react-three/fiber';
import { Experience } from '../components/Experience';
import { Scroll } from '@react-three/drei';

const AppHome = () => {
  return (
    <>
      <div style={{ height: '100vh', width: '100vw' }}>
        <Canvas
          camera={{
            fov: 70,
            position: [2.3, 1.5, 2.7],
          }}
        >
          <Experience />
        </Canvas>
      </div>
    </>
  );
};

export default AppHome;

export const Content = ({
  offices,
  officeLocations,
}: {
  offices: OfficeType[];
  officeLocations: any;
}) => {
  return (
    <Scroll html>
      <main className={style.main}>
        <h1>Encontre o lar que você sempre sonhou</h1>
        <div style={{ marginTop: '200px' }}>
          {offices.map((office: any) => (
            <Link key={office.id} href={`/${office.url}`}>
              <div>{office.name}</div>
            </Link>
          ))}
        </div>
        <MapWithCircle locations={officeLocations} />
      </main>
    </Scroll>
  );
};
