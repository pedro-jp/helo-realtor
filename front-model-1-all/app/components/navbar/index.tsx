import Link from 'next/link';
import style from './style.module.scss';

type OfficeType = {
  url?: string;
  phone?: string;
};
export default function Navbar({ url, phone }: OfficeType) {
  return (
    <menu className={style.menu}>
      <div className={style.hamburger}>
        <input type='checkbox' name='' id='' />
      </div>
      <nav className={style.navbar}>
        <ul>
          <li>
            <Link href={url ? `/${url}` : '/'}>Lista de Imóveis</Link>
          </li>
          {/* <li>
            <Link href={'/imoveis'}>Lista de Imóveis</Link>
          </li> */}
          {/* <li>Sobre</li> */}
          <li>
            <Link target='_blank' href={phone ? `https://wa.me/${phone}` : '/'}>
              Contato
            </Link>
          </li>
        </ul>
      </nav>
    </menu>
  );
}
