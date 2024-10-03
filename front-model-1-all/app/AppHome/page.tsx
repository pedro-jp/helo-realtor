'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { OfficeType } from '../types';
import MapWithCircle from '../components/mapOffices';
import style from './styles.module.scss';
import { Loading } from '../components/Loading';
import { Canvas } from '@react-three/fiber';
import { Experience } from '../components/Experience';
import { Environment, Float, Scroll } from '@react-three/drei';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
          <Environment files='/lebombo_4k.exr' background={true} />
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
        <div className={style.container}>
          <Section>
            <h1>Encontre o lar que você sempre sonhou</h1>
          </Section>
          <Section>
            <AnimatedHeading>Nossos escritórios</AnimatedHeading>
            <div style={{ background: 'red' }}>
              {offices.map((office: any) => (
                <Link key={office.id} href={`/${office.url}`}>
                  <div>
                    {office.name} - {office.address}
                  </div>
                </Link>
              ))}
            </div>
          </Section>
          <Section>
            <AnimatedHeading>
              Localize o escritório mais próximo de você
            </AnimatedHeading>
            <MapWithCircle locations={officeLocations} />
          </Section>
          <Section styles={{ alignSelf: 'center', fontSize: '1.5rem' }}>
            <AnimatedHeading>
              Por que ter um site para expor seus imóveis?
            </AnimatedHeading>
          </Section>

          <Section>
            <AnimatedParagraph>
              Ter um site dedicado para a venda de imóveis não é apenas uma
              tendência moderna, mas uma necessidade fundamental para qualquer
              negócio imobiliário. Aqui estão alguns números que demonstram os
              benefícios:
            </AnimatedParagraph>
          </Section>
          <Section>
            <AnimatedParagraph>
              Aumento nas taxas de conversão: Imóveis expostos em um site
              dedicado têm uma taxa de conversão média de 2,5%, em comparação
              com apenas 0,5% para anúncios em redes sociais e marketplaces.
            </AnimatedParagraph>
          </Section>
          <Section>
            <AnimatedParagraph>
              Visibilidade 24/7: Com um site, seus imóveis estão disponíveis
              para visualização a qualquer hora, todos os dias, permitindo que
              os potenciais compradores pesquisem e explorem as opções no
              momento que for mais conveniente para eles.
            </AnimatedParagraph>
          </Section>
          <Section>
            <AnimatedParagraph>
              Melhor segmentação de público: Com um site, você pode usar SEO
              (Otimização para Mecanismos de Busca) para alcançar diretamente o
              seu público-alvo, aumentando a probabilidade de que visitantes
              qualificados entrem em contato.
            </AnimatedParagraph>
          </Section>
          <Section>
            <AnimatedParagraph>
              Credibilidade e profissionalismo: Um site bem projetado passa uma
              imagem de credibilidade e profissionalismo, aumentando a confiança
              do cliente em sua marca.
            </AnimatedParagraph>
          </Section>
          <Section>
            <AnimatedParagraph>
              Aumento no engajamento do cliente: Sites interativos podem
              aumentar o engajamento dos visitantes em até 50%, proporcionando
              uma melhor experiência do usuário e incentivando a exploração de
              mais imóveis.
            </AnimatedParagraph>
          </Section>
          <Section>
            <AnimatedParagraph>
              Capacidade de coleta de dados: Ter um site permite que você colete
              dados valiosos sobre seus visitantes, ajudando a personalizar suas
              ofertas e melhorar suas estratégias de marketing.
            </AnimatedParagraph>
          </Section>
          <Section>
            <AnimatedHeading>
              Baixe o aplicativo para android no link abaixo
            </AnimatedHeading>
            <a href='/apps/helorealtor.apk'>Baixe aqui</a>
          </Section>
        </div>
      </main>
    </Scroll>
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
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
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

const AnimatedParagraph = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.6 }}
      className={style.paragraph}
    >
      {children}
    </motion.p>
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
