import { Inter } from 'next/font/google';
import Head from 'next/head';

import styles from '../../styles/home.module.scss';
import pageStyle from './styles.module.scss';
import background from '../../assets/images/interior.jpg';
import Image from 'next/image';

import Link from 'next/link';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
  IoEye,
  IoEyeOff
} from 'react-icons/io5';
import axios from 'axios';

export default function Signup() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postal_code, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('BR');
  const [number, setNumber] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const [page, setPage] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [complement, setComplement] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (street !== '' && neighborhood !== '')
      setAddress(`${street}${number ? `, ${number}` : ''}  - ${neighborhood}`);
    if (postal_code.length === 9) {
      fetchAddressByCEP(postal_code).then(() => {});
    }
    if (
      name !== '' &&
      email !== '' &&
      password !== '' &&
      city !== '' &&
      state !== '' &&
      postal_code !== '' &&
      address !== '' &&
      country !== '' &&
      number !== ''
    ) {
      setCanSubmit(true);
    }
  }, [
    name,
    email,
    password,
    city,
    state,
    postal_code,
    address,
    country,
    number
  ]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (
      name === '' ||
      email === '' ||
      password === '' ||
      city === '' ||
      state === '' ||
      postal_code === '' ||
      address === '' ||
      country === ''
    ) {
      toast.warn('Preencha os dados');
      return;
    }

    setIsLoading(true);

    let data = {
      name,
      email,
      password,
      city,
      state,
      postal_code,
      address,
      complement,
      country: 'BR'
    };

    await signUp(data);
    setIsLoading(false);
  };

  const formatCEP = (value: string) => {
    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, '');
    // Adiciona o traço após os primeiros 5 dígitos
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    // Limita o tamanho a 9 caracteres (ex: 12345-678)
    return value.slice(0, 9);
  };

  const fetchAddressByCEP = async (cep: string) => {
    try {
      if (cep.length === 9) {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );

        const addressData = response.data;
        if (addressData && !addressData.erro) {
          setCity(addressData.localidade || '');
          setState(addressData.uf || '');
          setStreet(addressData.logradouro || '');
          setNeighborhood(addressData.bairro || '');
          setAddress(
            `${addressData.logradouro || ''}${number ? `, ${number}` : ''} - ${
              addressData.bairro || ''
            }`
          );
        } else {
          toast.warn('CEP não encontrado');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      toast.error('Erro ao buscar o endereço');
    }
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCEP(e.target.value);
    setPostalCode(formattedValue);

    if (formattedValue.length === 9) {
      fetchAddressByCEP(formattedValue);
    }
  };

  const onlyNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value.replace(/\D/g, '');
  };

  return (
    <>
      <Head>
        <title>IntG Realtor | Cadastro</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.containerCenter}>
          <div className={styles.login}>
            <h1>Criando sua conta</h1>
            <form onSubmit={handleSubmit}>
              <div
                style={{ display: page === 1 ? 'block' : 'none' }}
                className={pageStyle.basicInfo}
              >
                <label htmlFor='name'>
                  Nome
                  <Input
                    id='name'
                    placeholder='Zezinho da Silva'
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label htmlFor='email'>
                  Email
                  <Input
                    id='email'
                    placeholder='TzW0x@exemplo.com'
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label htmlFor='password'>
                  Senha
                  <Input
                    id='password'
                    placeholder={showPassword ? '12345678' : '••••••••'}
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className={pageStyle.eyeContainer}>
                    {showPassword ? (
                      <IoEye
                        size={20}
                        className={styles.eye}
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <IoEyeOff
                        size={20}
                        className={styles.eye}
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </label>
              </div>
              <div
                className={pageStyle.basicInfo}
                style={{ display: page === 2 ? 'block' : 'none' }}
              >
                <div className={pageStyle.numbersAddress}>
                  <label htmlFor='postal_code'>
                    CEP
                    <Input
                      id='postal_code'
                      placeholder='12345-678'
                      type='text'
                      value={postal_code}
                      onChange={handlePostalCodeChange}
                    />
                  </label>
                  <label htmlFor='number'>
                    Número
                    <Input
                      id='number'
                      placeholder='123'
                      type='text'
                      value={number}
                      onChange={(e) => setNumber(onlyNumbers(e))}
                    />
                  </label>
                </div>
                <div className={pageStyle.cityState}>
                  <label htmlFor='city'>
                    Cidade
                    <Input
                      id='city'
                      placeholder='São Paulo'
                      value={city}
                      type='text'
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </label>
                  <label htmlFor='state'>
                    Estado
                    <Input
                      id='state'
                      value={state}
                      placeholder='SP'
                      type='text'
                      onChange={(e) => setState(e.target.value)}
                    />
                  </label>
                </div>
                <label htmlFor='address'>
                  Endereço
                  <Input
                    id='address'
                    placeholder='Av. Paulista, 123 - Centro'
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>
                <label htmlFor='complement'>
                  Complemento
                  <Input
                    id='complement'
                    placeholder='Casa 1'
                    type='text'
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                  />
                </label>
                {/* <label htmlFor='country'>
                      País
                      <Input
                        id='country'
                        placeholder='BR'
                        type='text'
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </label> */}
              </div>

              {canSubmit && (
                <Button type='submit' loading={isLoading}>
                  Cadastrar
                </Button>
              )}
              <Button
                type='button'
                onClick={() => {
                  if (page === 1) {
                    setPage(2);
                  }

                  if (page === 2) {
                    setPage(1);
                  }
                }}
              >
                {page === 1 && <IoArrowForwardCircleOutline size={40} />}
                {page === 2 && <IoArrowBackCircleOutline size={40} />}
              </Button>
            </form>
            <Link href='/' className={styles.text}>
              Já possui uma conta? Faça login
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
