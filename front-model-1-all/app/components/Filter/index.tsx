'use client';
import React, { useEffect, useState, useRef } from 'react';
import style from './style.module.scss';
import { api } from '@/app/services/api';
import { CategoryType, ImovelType } from '@/app/types';
import Cards from '../cards';
import {
  IoIosAddCircleOutline,
  IoIosArrowBack,
  IoIosArrowRoundBack,
  IoIosArrowRoundForward
} from 'react-icons/io';
import Loading from '../ParticlesLoading';
interface PageProps {
  url?: string;
  officeId?: string;
  all?: boolean;
}

export default function Filter({ url, officeId, all }: PageProps) {
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sended, setSended] = useState(0);
  const categoryRef = useRef<HTMLOptionElement>(null);
  const quartosRef = useRef<HTMLOptionElement>(null);
  const vagasRef = useRef<HTMLOptionElement>(null);

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
    page
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

    const urlParams = `/${all ? 'all/imoveis' : 'imoveis'}/search/${url}/${address ? address : 'null'}/${
      minPrice === undefined || minPrice <= 0 ? 0 : minPrice
    }/${
      maxPrice === undefined || maxPrice <= 0 ? 999999999999999 : maxPrice
    }/${minDormitorios}/${minVagas}/${categoria ? categoria : 'null'}/${
      transactionType ? transactionType : 'null'
    }/${page}`;
    try {
      const response = await api.get(urlParams);
      setImoveis(response.data.imoveis);
      setTotalPages(response.data.totalPages);
      setSended(response.data.sended);
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
    content: whatType()
  };

  const handleMaxPriceInput = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9]/g, '')) / 100;
    setMaxPrice(numericValue);
    setMaxPriceBrl(
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(numericValue)
    );
  };

  const handleMinPriceInput = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9]/g, '')) / 100;
    setMinPrice(numericValue);
    setMinPriceBrl(
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(numericValue)
    );
  };

  const handleClearFilters = () => {
    handleMaxPriceInput('0');
    handleMinPriceInput('0');
    setAddress('');
    setMinDormitorios(0);
    setMinVagas(0);
    setCategoria('');
    setTransactionType('');
    if (categoryRef.current) {
      categoryRef.current.selected = true;
    }
    if (quartosRef.current) {
      quartosRef.current.selected = true;
    }
    if (vagasRef.current) {
      vagasRef.current.selected = true;
    }
  };

  return (
    <section className={style.container}>
      {isLoading && <Loading />}
      <aside className={style.filter}>
        <div className={style.filters}>
          <div className={style.transactionType}>
            <div className={style.switch} onClick={handleSetTransaction}>
              <div className={style.slider} style={styles}>
                {whatType()}
              </div>
            </div>
          </div>
          {categories && !all && (
            <select onChange={(e) => setCategoria(e.target.value)}>
              <option ref={categoryRef} value=''>
                Categorias
              </option>
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
            <option ref={quartosRef} value={0}>
              Dormitórios
            </option>
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
            <option ref={vagasRef} value={0}>
              Vagas
            </option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
            <option value={5}>5+</option>
          </select>
          <button className={style.clear_filters} onClick={handleClearFilters}>
            Limpar Filtros
          </button>
        </div>
      </aside>
      {imoveis && (
        <section>
          <div className={style.cards_container}>
            <Cards imoveis={imoveis} url={url} all={all && all} />
          </div>
          <div className={style.pagination}>
            {page && page >= 2 && (
              <button
                onClick={() => {
                  setPage((current) => current - 1);
                }}
                disabled={page <= 1 || isLoading}
              >
                <IoIosArrowRoundBack size={30} />
              </button>
            )}
            {page && page < totalPages && (
              <button
                onClick={() => {
                  setPage((current) => current + 1);
                }}
                disabled={page >= totalPages || isLoading}
              >
                <IoIosArrowRoundForward size={30} />
              </button>
            )}
          </div>
        </section>
      )}
    </section>
  );
}
