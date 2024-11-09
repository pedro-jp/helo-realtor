import Link from 'next/link';
import styles from './style.module.scss';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext, signOut } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

export function Sidebar() {
  const router = useRouter();

  return (
    <nav>
      <div className={styles.burger}>
        <input type='checkbox' />
        <span className={styles.line1}></span>
        <span className={styles.line2}></span>
        <span className={styles.line3}></span>
      </div>
      <div className={styles.sidebar}>
        <h1>IntG Realtor</h1>
        <ul>
          <li>
            <Link href='/office'>Escritório</Link>
          </li>
          <li>
            <Link href='/realtors'>Corretores</Link>
          </li>
          <li>
            <Link href='/categories'>Categorias</Link>
          </li>
          <li>
            <Link href='/plans'>Planos</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href='/creation'>Criação</Link>
          </li>
          <li>
            <Link href='/propertys'>Imóveis</Link>
          </li>
        </ul>
        <ul>
          <li>
            <button onClick={() => signOut(router)}>
              <FiLogOut size={24} color='white' />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
