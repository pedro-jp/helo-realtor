'use client';

import React from 'react';
import style from './style.module.scss';
import { IoClose } from 'react-icons/io5';
import { api } from '@/app/services/api';
import { OfficeType } from '@/app/types';

export const SubscriptionModal = ({
  office,
  open,
}: {
  office: OfficeType;
  open?: boolean;
}) => {
  const [isClosed, setIsClosed] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleClose = () => {
    setIsClosed(true);
    setTimeout(() => setIsVisible(false), 400); // Ajuste o tempo para a duração da animação de fechamento
  };

  if (!isVisible) return null; // Oculta o modal após a animação de fechamento

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica para enviar o formulário

    try {
      const response = await api.post('/visitor/subscription', {
        name,
        email,
        officeId: office.id,
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${style.modal} ${isClosed ? style.close : style.open}`}>
      <div className={style.header}>
        <IoClose className={style.close} onClick={handleClose} />
      </div>
      <h1>
        Inscreva-se para receber novidades
        {office?.name ? ` de ${office.name}` : ''}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Nome'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>
          <span>Inscrever</span>
        </button>
      </form>
    </div>
  );
};
