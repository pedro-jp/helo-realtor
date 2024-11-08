import styles from './styles.module.scss';
import { Sidebar } from '@/components/Sidebar';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { setupAPIClient } from '@/services/api';
import Container from '@/components/Container';
import Content from '@/components/Content';
import { Main } from '@/components/Main';
import { Header } from '@/components/Header';
import { ImovelType } from '@/Types';
import Image from 'next/image';
import Link from 'next/link';

export default function Propriedades() {
  const { user, loading, setLoading, isAuthenticated } =
    useContext(AuthContext);
  const router = useRouter();
  const api = setupAPIClient(router);
  const [imoveis, setImoveis] = useState<ImovelType[]>([] as ImovelType[]);

  useEffect(() => {
    getImoveis();
  }, [user, isAuthenticated]);

  async function getImoveis() {
    try {
      setLoading(true);
      const response = await api.get(`/imoveis/${user.id}`);
      setImoveis(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>IntG Realtor | Propriedades</title>
      </Head>
      <Container>
        <Sidebar />
        <Content>
          <Header>Propriedades</Header>
          <Main
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {imoveis.map((imovel) => (
              <>
                <Link href={`/creation/${imovel.id}`}>
                  <h3>{imovel.name}</h3>
                  <div className={styles.card} key={imovel.id}>
                    <figure>
                      <Image
                        src={imovel.images[0]?.url}
                        alt={imovel.name}
                        width={300}
                        height={300}
                      />
                    </figure>
                    <div>
                      <h3>{imovel.local}</h3>
                      <p>{imovel.description}</p>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </Main>
        </Content>
      </Container>
    </>
  );
}
