'use client';
import { Favorite } from '@/app/assets/svg';
import { api } from '@/app/services/api';
import { ImovelType } from '@/app/types';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

// Função para buscar o IP do cliente usando a API ipify
async function getClientIp() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip; // Retorna o IP do cliente
  } catch (error) {
    console.error('Erro ao obter o IP do cliente:', error);
    return null;
  }
}

type FavoritarProps = {
  imovel: ImovelType;
};

const Favoritar = ({ imovel }: FavoritarProps) => {
  const [favorito, setFavorito] = useState(false);
  const [favoriteToRemove, setFavoriteToRemove] = useState<any>(null);
  useEffect(() => {
    async function checkIfFavorited() {
      const clientIp = await getClientIp(); // Obtém o IP do cliente

      if (clientIp && imovel?.favorites) {
        // Verifica se o IP do cliente está presente no array de favoritos
        const isFavorited = imovel.favorites.some(
          (favorite: any) => favorite.ip === clientIp
        );

        setFavorito(isFavorited); // Atualiza o estado do botão com true ou false
        setFavoriteToRemove(
          imovel.favorites.find((favorite: any) => favorite.ip === clientIp)
        );
        console.log(favoriteToRemove?.id);
      }
    }

    checkIfFavorited(); // Chama a função ao carregar a página
  }, [imovel.favorites]); // Executa sempre que 'imovel.favorites' mudar

  async function handleFavorite() {
    setFavorito(!favorito);
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
    const clientIp = await getClientIp(); // Obtém o IP do cliente

    if (!clientIp) {
      console.error('Não foi possível obter o IP do cliente');
      return;
    }

    try {
      if (!favorito) {
        const response = await api.post(
          `${process.env.NEXT_PUBLIC_URL}/imoveis/favorites/${imovel.id}/${clientIp}`
        );
        setFavorito(true); // Atualiza o estado para favorito
        console.log(response.data); // Certifique-se de estar logando a resposta corretamente
      } else {
        const response = await api.delete(
          `${process.env.NEXT_PUBLIC_URL}/imoveis/favorites/${favoriteToRemove.id}/${clientIp}`
        );
        setFavorito(false); // Atualiza o estado para favorito
        console.log(response.data); // Certifique-se de estar logando a resposta corretamente
      }
    } catch (error: any) {
      console.log(
        'Erro ao fazer a requisição:',
        error.response?.data || error.message
      );
    }
  }

  return (
    <button className={styles.favoritar} onClick={handleFavorite}>
      <Favorite
        className={styles.icon}
        style={{ fill: favorito ? 'red' : 'black' }}
      />
    </button>
  );
};

export default Favoritar;
