'use client';
import React from 'react';
import styles from './styles.module.scss';
import { Share } from '@/app/assets/svg';

interface ShareButtonProps {
  title: string;
  text: string;
}

const BtnCompartilhar: React.FC<ShareButtonProps> = ({ title, text }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: window.location.href,
        });
        console.log('Compartilhamento bem-sucedido');
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      console.log('Web Share API não é suportada neste navegador.');
    }
  };

  return (
    <Share className={styles.share} onClick={handleShare}>
      Compartilhar
    </Share>
  );
};

export default BtnCompartilhar;
