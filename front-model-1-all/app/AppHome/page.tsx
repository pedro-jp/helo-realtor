'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { OfficeType } from '../types';
import MapWithCircle from '../components/mapOffices';
import style from './styles.module.scss';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Build from '../assets/img/build.jpg';
import Image from 'next/image';
import { Iphone } from '../assets/svg';

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
      officeId: office.id,
    }));

  return (
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
                <a target='_blank' href='https://app.helotechbr.com'>
                  Cadastrar
                </a>
              </section>
            </div>
          </figure>
        </section>
        <section className={style.section_container}>
          <AnimatedSection
            styles={{
              alignSelf: 'center',
              fontSize: '1.5rem',
              background: '#5A8AA7',
              marginTop: '-40px',
            }}
          >
            <h1>Encontre o lar que você sempre sonhou</h1>
          </AnimatedSection>
          <div>
            <AnimatedSection>
              <h2>Todos os escritórios</h2>
              <div className={style.chat_bubble}>
                {offices.map((office: any) => (
                  <Link key={office.id} href={`/${office.url}`}>
                    {office.name} - {office.address}
                    <br />
                  </Link>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className={style.map_container} style={{ width: '100vh' }}>
                <h2 style={{ marginBottom: '20px' }}>
                  Localize o escritório mais próximo de você
                </h2>
                <MapWithCircle locations={officeLocations} />
              </div>
            </AnimatedSection>
          </div>
        </section>
        <section className={style.section_container}>
          <div>
            <AnimatedSection
              styles={{
                alignSelf: 'center',
                fontSize: '1.5rem',
                background: '#5A8AA7',
                marginTop: '-40px',
              }}
            >
              <h2>Por que ter um site para expor seus imóveis?</h2>
            </AnimatedSection>
            <AnimatedSection className={style.chat_bubble}>
              <Paragraph>
                Ter um site dedicado para a venda de imóveis não é apenas uma
                tendência moderna, mas uma necessidade fundamental para qualquer
                negócio imobiliário. Aqui estão alguns números que demonstram os
                benefícios:
              </Paragraph>
            </AnimatedSection>
            <AnimatedSection>
              <Paragraph>
                Aumento nas taxas de conversão: Imóveis expostos em um site
                dedicado têm uma taxa de conversão média de 2,5%, em comparação
                com apenas 0,5% para anúncios em redes sociais e marketplaces.
              </Paragraph>
            </AnimatedSection>
            <AnimatedSection>
              <Paragraph>
                Visibilidade 24/7: Com um site, seus imóveis estão disponíveis
                para visualização a qualquer hora, todos os dias, permitindo que
                os potenciais compradores pesquisem e explorem as opções no
                momento que for mais conveniente para eles.
              </Paragraph>
            </AnimatedSection>
            <AnimatedSection>
              <Paragraph>
                Melhor segmentação de público: Com um site, você pode usar SEO
                (Otimização para Mecanismos de Busca) para alcançar diretamente
                o seu público-alvo, aumentando a probabilidade de que visitantes
                qualificados entrem em contato.
              </Paragraph>
            </AnimatedSection>
            <AnimatedSection>
              <Paragraph>
                Credibilidade e profissionalismo: Um site bem projetado passa
                uma imagem de credibilidade e profissionalismo, aumentando a
                confiança do cliente em sua marca.
              </Paragraph>
            </AnimatedSection>
            <AnimatedSection>
              <Paragraph>
                Aumento no engajamento do cliente: Sites interativos podem
                aumentar o engajamento dos visitantes em até 50%, proporcionando
                uma melhor experiência do usuário e incentivando a exploração de
                mais imóveis.
              </Paragraph>
            </AnimatedSection>
            <AnimatedSection>
              <Paragraph>
                Capacidade de coleta de dados: Ter um site permite que você
                colete dados valiosos sobre seus visitantes, ajudando a
                personalizar suas ofertas e melhorar suas estratégias de
                marketing.
              </Paragraph>
            </AnimatedSection>
          </div>
        </section>
        <section className={style.section_container}>
          <AnimatedSection styles={{ alignSelf: 'center', fontSize: '1.5rem' }}>
            <AnimatedHeading>
              Baixe o aplicativo para android no link abaixo
            </AnimatedHeading>
            <a href='/apps/helorealtor.apk'>Baixe aqui</a>
          </AnimatedSection>
        </section>
      </div>
    </main>
  );
};

// Componentes para aplicar animações
const AnimatedHeading = ({
  children,
  styles,
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
  styles,
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
  styles,
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
  styles,
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
