'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { OfficeType } from '../types';
import MapWithCircle from '../components/mapOffices';
import style from './styles.module.scss';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Build from '../assets/img/build.jpg';
import Image from 'next/image';
import TsParticles from '../components/Particles';
import Filter from '../components/Filter';

const AppHome = () => {
  const [loading, setLoading] = useState(false);
  const [offices, setOffices] = useState<OfficeType[]>([]);

  useEffect(() => {
    async function loadOffices() {
      const data = await fetchOffices();
      setOffices(data);
    }
    loadOffices();
  }, []);

  async function fetchOffices(): Promise<OfficeType[]> {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/offices`);
      const data = await response.json();
      const offices = data.flatMap((user: any) => user.office);
      return offices;
    } catch (error) {
      console.error('Failed to fetch offices:');
      return [];
    } finally {
      setLoading(false);
    }
  }

  const officeLocations = offices
    .filter((office) => office.latitude && office.longitude) // Certifica-se de que há lat/lon válidos
    .map((office) => ({
      latitude: office.latitude.toString(),
      longitude: office.longitude.toString(),
      marker: true,
      officeName: office.name,
      officeId: office.id
    }));

  return (
    <>
      <TsParticles />
      <main className={style.main}>
        <div className={style.container}>
          <section className={style.section_container}>
            <figure className={style.hero}>
              <Image
                className={style.hero_image}
                src={Build}
                alt='House Image'
                width={1920}
                height={1080}
              />
              <div className={style.hero_overlay}>
                <section>
                  <h1>
                    Crie uma conta <br /> e comece a <br />
                    a vender seus <br /> imóveis
                  </h1>
                  <p>
                    Nossa plataforma de imóveis online oferece uma solução
                    completa para o seu negócio imobiliário. Com recursos
                    avançados para atender às necessidades de vendas de imóveis
                    online.
                  </p>
                  <Link
                    className={style.cadastre}
                    target='_blank'
                    href='https://corretor.intg.com.br/'
                  >
                    Cadastrar
                  </Link>
                </section>
              </div>
            </figure>
          </section>
          <section
            className={[style.section_container, style.section_2].join(' ')}
          >
            <AnimatedSection
              styles={{
                alignSelf: 'center',
                fontSize: '1.5rem',
                background: '#9a8077',
                marginTop: '-40px'
              }}
            >
              <h1>Encontre o lar que você sempre sonhou</h1>
            </AnimatedSection>
            <div>
              <AnimatedSection
                styles={{
                  background: '#9a8077',
                  marginTop: '-40px'
                }}
              >
                <h2>Todos os escritórios</h2>
                {offices.map((office: any) => (
                  <div key={office.id} className={style.chat_bubble}>
                    <Link href={`e/${office.url}`}>
                      {office.name} - {office.address}
                      <br />
                    </Link>
                  </div>
                ))}
              </AnimatedSection>
              <AnimatedSection
                styles={{
                  background: '#9a8077',
                  marginTop: '-40px'
                }}
                className={style.map_container}
              >
                <div style={{ width: '100%' }}>
                  <h2 style={{ marginBottom: '20px' }}>
                    Localize o escritório mais próximo de você
                  </h2>
                  <MapWithCircle locations={officeLocations} />
                </div>
              </AnimatedSection>
            </div>
          </section>
          <section className={style.section_cards}>
            <Filter all />
          </section>
        </div>
      </main>
    </>
  );
};

// Componentes para aplicar animações
const AnimatedHeading = ({
  children,
  styles
}: {
  children: React.ReactNode;
  styles?: any;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      // Quando o elemento estiver visível, anima para aparecer
      controls.start({ opacity: 1, y: 0 });
    } else {
      // Quando o elemento sair da visão, volta ao estado inicial
      controls.start({ opacity: 0, y: 50 });
    }
  }, [controls, inView]);

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.6 }}
      className={`${style.heading} ${styles || ''}`}
    >
      {children}
    </motion.h2>
  );
};

const AnimatedLink = ({
  children,
  styles
}: {
  children: React.ReactNode;
  styles?: any;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      // Quando o elemento estiver visível, anima para aparecer
      controls.start({ opacity: 1, y: 0 });
    } else {
      // Quando o elemento sair da visão, volta ao estado inicial
      controls.start({ opacity: 0, y: 50 });
    }
  }, [controls, inView]);

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.6 }}
      className={`${style.heading} ${styles || ''}`}
    >
      {children}
    </motion.p>
  );
};

const AnimatedSection = ({
  children,
  styles
}: {
  children: React.ReactNode;
  styles?: any;
  className?: string;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      // Quando o elemento estiver visível, anima para aparecer
      controls.start({ opacity: 1, y: 0 });
    } else {
      // Quando o elemento sair da visão, volta ao estado inicial
      controls.start({ opacity: 0, y: 50 });
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.6 }}
      className={`${style.section} ${styles || ''}`}
      style={styles}
    >
      {children}
    </motion.section>
  );
};

const Section = ({
  children,
  styles
}: {
  children: React.ReactNode;
  styles?: any;
}) => {
  return (
    <section className={style.section} style={styles}>
      {children}
    </section>
  );
};

const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p className={style.paragraph}>{children}</p>;
};

export default AppHome;
