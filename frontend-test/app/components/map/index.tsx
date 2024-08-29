'use client';
import { useState, useEffect } from 'react';
import style from './style.module.scss';

// Função para expandir a URL encurtada
async function expandShortURL(shortURL: string) {
  try {
    const response = await fetch(shortURL, {
      method: 'HEAD',
      redirect: 'manual', // Evita o redirecionamento automático
    });

    const longURL = response.headers.get('location');
    return longURL;
  } catch (error) {
    console.error('Erro ao expandir a URL:', error);
    return null;
  }
}

// Função para converter a URL completa para uma URL de incorporação
function convertToEmbedURL(googleMapsLink: string) {
  // Extrair as coordenadas do link original
  const coordinateMatch = googleMapsLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

  if (!coordinateMatch) {
    throw new Error(
      'Não foi possível extrair as coordenadas do link fornecido.'
    );
  }

  const latitude = coordinateMatch[1];
  const longitude = coordinateMatch[2];

  // Identificar o ID do local e o nome do local
  const placeMatch = googleMapsLink.match(/!1s([^!]+)!/);
  const placeId = placeMatch ? placeMatch[1] : null;

  const nameMatch = googleMapsLink.match(/place\/([^\/@]+)/);
  const placeName = nameMatch ? nameMatch[1].replace(/\+/g, ' ') : 'Local';

  // Construir a URL de incorporação
  const embedURL = `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14620.780907842623!2d${longitude}!3d${latitude}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${placeId}!2s${encodeURIComponent(
    placeName
  )}!5e0!3m2!1spt-BR!2sbr!4v1724871626397!5m2!1spt-BR!2sbr`;

  return embedURL;
}

// Função que combina a expansão da URL e a conversão para incorporação
async function expandAndConvert(shortURL: string) {
  // Expande a URL encurtada
  const longURL = await expandShortURL(shortURL);

  if (longURL) {
    // Converte a URL completa para URL de incorporação
    const embedURL = convertToEmbedURL(longURL);
    return embedURL;
  } else {
    console.error('Não foi possível expandir a URL encurtada.');
    return null;
  }
}

// Componente React que utiliza o iframe para exibir o mapa
export default function Map() {
  const [embedURL, setEmbedURL] = useState<string | null>(null);
  const shortLink = 'https://maps.app.goo.gl/JE7JCLFMKCMdQAzP9'; // Exemplo de link encurtado

  useEffect(() => {
    // Expande e converte o link encurtado quando o componente é montado
    expandAndConvert(shortLink).then((url) => {
      if (url) {
        setEmbedURL(url);
      }
    });
  }, [shortLink]);

  return (
    <div>
      {embedURL ? (
        <iframe
          className={style.map}
          src={embedURL}
          width='600'
          height='450'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
        ></iframe>
      ) : (
        <p>Carregando o mapa...</p>
      )}
    </div>
  );
}
