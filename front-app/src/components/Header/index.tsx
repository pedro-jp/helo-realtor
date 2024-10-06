import Link from 'next/link';
import styles from './style.module.scss';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export function Header() {
  const { signOut } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href={'/dashboard'}>
          <Image src='/logo.svg' width={190} height={60} alt='logo' />
        </Link>
        <nav>
          <Link href='/category'>Categoria</Link>
          <Link href='/product'>Cardapio</Link>
          <button onClick={signOut}>
            <FiLogOut color='#fff' size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
