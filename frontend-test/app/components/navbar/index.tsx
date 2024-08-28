import Link from 'next/link';
import style from './style.module.scss';
export default function Navbar() {
  return (
    <nav className={style.navbar}>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>Sobre</li>
        <li>Contato</li>
      </ul>
    </nav>
  );
}
