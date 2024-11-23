'use client';
import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
import { api } from '@/app/services/api';
import { CategoryType, ImovelType } from '@/app/types';
import Cards from '../cards';

interface PageProps {
  url: string;
  officeId: string;
}

export default function Filter({ url, officeId }: PageProps) {
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [address, setAddress] = useState('');
  const [imoveis, setImoveis] = useState<ImovelType[]>([] as ImovelType[]);
  const [minDormitorios, setMinDormitorios] = useState(0);
  const [minVagas, setMinVagas] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [categoria, setCategoria] = useState('');
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [transactionType, setTransactionType] = useState('');
  const [minPriceBrl, setMinPriceBrl] = useState('');
  const [maxPriceBrl, setMaxPriceBrl] = useState('');

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [
    minPrice,
    maxPrice,
    address,
    minDormitorios,
    minVagas,
    categoria,
    transactionType,
  ]);

  const getCategories = async () => {
    try {
      const response = await api.get(`/office/categories/${officeId}`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);

    const urlParams = `/imoveis/search/${url}/${address ? address : 'null'}/${
      minPrice === undefined || minPrice <= 0 ? 0 : minPrice
    }/${
      maxPrice === undefined || maxPrice <= 0 ? 999999999999999 : maxPrice
    }/${minDormitorios}/${minVagas}/${categoria ? categoria : 'null'}/${
      transactionType ? transactionType : 'null'
    }`;

    try {
      const response = await api.get(urlParams);
      setImoveis(response.data.imoveis);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetTransaction = () => {
    if (transactionType === 'Locacao') {
      setTransactionType('Venda');
    } else {
      setTransactionType('Locacao');
    }
  };

  const whatColor = () => {
    let color = '';
    switch (transactionType) {
      case '':
        color = '';
        break;
      case 'Locacao':
        color = '#5C8A72';
        break;
      case 'Venda':
        color = '#7D6F8A';
        break;
      default:
        break;
    }
    return color;
  };

  const whatType = () => {
    switch (transactionType) {
      case 'Locacao':
        return 'Locação';
      case 'Venda':
        return 'Venda';
      default:
        return 'Todos';
    }
  };

  const styles = {
    left: transactionType === 'Locacao' ? 'calc(50% - 4px)' : '',
    backgroundColor: whatColor(),
    content: whatType(),
  };

  const handleMaxPriceInput = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9]/g, '')) / 100;
    setMaxPrice(numericValue);
    setMaxPriceBrl(
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(numericValue)
    );
  };

  const handleMinPriceInput = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9]/g, '')) / 100;
    setMinPrice(numericValue);
    setMinPriceBrl(
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(numericValue)
    );
  };

  return (
    <section className={style.container}>
      <aside className={style.filter}>
        <div className={style.filters}>
          <h2>Filtro</h2>
          <div className={style.transactionType}>
            <div className={style.switch} onClick={handleSetTransaction}>
              <div className={style.slider} style={styles}>
                {whatType()}
              </div>
            </div>
          </div>
          {categories && (
            <select onChange={(e) => setCategoria(e.target.value)}>
              <option value=''>Categorias</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
          <input
            type='text'
            placeholder='Endereço'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type='text'
            placeholder='Preço mínimo'
            value={minPriceBrl}
            onChange={(e) => handleMinPriceInput(e.target.value)}
          />
          <input
            type='txt'
            placeholder={'Preço máximo'}
            value={maxPriceBrl}
            onChange={(e) => handleMaxPriceInput(e.target.value)}
          />
          <select
            value={minDormitorios}
            onChange={(e) => setMinDormitorios(Number(e.target.value))}
          >
            <option value={0}>Dormitórios</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
            <option value={5}>5+</option>
          </select>
          <select
            value={minVagas}
            onChange={(e) => setMinVagas(Number(e.target.value))}
          >
            <option value={0}>Vagas</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
            <option value={5}>5+</option>
          </select>
        </div>
      </aside>
      {imoveis && (
        <section>
          <h2 style={{ textAlign: 'center', marginBlock: '20px' }}>
            Imóveis Disponiveis
          </h2>
          <div className={style.cards_container}>
            <Cards imoveis={imoveis} url={url} />
          </div>
        </section>
      )}
    </section>
  );
}
