import Link from 'next/link';
import style from './style.module.scss';
export default function Navbar() {
  return (
    <menu className={style.menu}>
      <div className={style.hamburger}>
        <input type='checkbox' name='' id='' />
      </div>
      <nav className={style.navbar}>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href={'/imoveis'}>Lista de Imóveis</Link>
          </li>
          <li>Sobre</li>
          <li>Contato</li>
        </ul>
      </nav>
    </menu>
  );
}
