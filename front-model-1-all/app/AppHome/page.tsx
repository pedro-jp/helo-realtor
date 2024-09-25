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
        <div className={style.container}>
          <Section>
            <h1>Encontre o lar que você sempre sonhou</h1>
          </Section>
          <Section>
            <h2>Nossos escritórios</h2>
            <div style={{ marginTop: '24px' }}>
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
            <h2>Localize o escritório mais próximo de você</h2>
            <MapWithCircle locations={officeLocations} />
          </Section>
          <Section>
            <h2>Por que ter um site para expor seus imóveis?</h2>

            <Paragraph>
              Ter um site dedicado para a venda de imóveis não é apenas uma
              tendência moderna, mas uma necessidade fundamental para qualquer
              negócio imobiliário. Aqui estão alguns números que demonstram os
              benefícios:
            </Paragraph>
            <Paragraph>
              Aumento nas taxas de conversão: Imóveis expostos em um site
              dedicado têm uma taxa de conversão média de 2,5%, em comparação
              com apenas 0,5% para anúncios em redes sociais e marketplaces.
            </Paragraph>
            <Paragraph>
              Visibilidade 24/7: Com um site, seus imóveis estão disponíveis
              para visualização a qualquer hora, todos os dias, permitindo que
              os potenciais compradores pesquisem e explorem as opções no
              momento que for mais conveniente para eles.
            </Paragraph>
            <Paragraph>
              Melhor segmentação de público: Com um site, você pode usar SEO
              (Otimização para Mecanismos de Busca) para alcançar diretamente o
              seu público-alvo, aumentando a probabilidade de que visitantes
              qualificados entrem em contato.
            </Paragraph>
            <Paragraph>
              Credibilidade e profissionalismo: Um site bem projetado passa uma
              imagem de credibilidade e profissionalismo, aumentando a confiança
              do cliente em sua marca.
            </Paragraph>
            <Paragraph>
              Aumento no engajamento do cliente: Sites interativos podem
              aumentar o engajamento dos visitantes em até 50%, proporcionando
              uma melhor experiência do usuário e incentivando a exploração de
              mais imóveis.
            </Paragraph>
            <Paragraph>
              Capacidade de coleta de dados: Ter um site permite que você colete
              dados valiosos sobre seus visitantes, ajudando a personalizar suas
              ofertas e melhorar suas estratégias de marketing.
            </Paragraph>
          </Section>
          <Section>
            <h2>Baixe o aplicativo para android no link abaixo</h2>
            <a href='/apps/helorealtor.apk'>Baixe aqui</a>
          </Section>
        </div>
      </main>
    </Scroll>
  );
};

const Section = ({ children }: { children: React.ReactNode }) => {
  return <section className={style.section}>{children}</section>;
};

const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p className={style.paragraph}>{children}</p>;
};
