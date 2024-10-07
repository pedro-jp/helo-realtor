import Link from 'next/link';
import styles from './style.module.scss';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

export function Header() {
  const { signOut } = useContext(AuthContext);
  const router = useRouter();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href={'/dashboard'}></Link>
        <nav>
          <Link href='/category'>Categoria</Link>
          <Link href='/product'>Cardapio</Link>
          <button onClick={() => signOut(router)}>
            <FiLogOut color='#fff' size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
