import style from './style.module.scss';

export default function Map() {
  return (
    <iframe
      className={style.map}
      src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1827.9217917418619!2d-46.769495!3d-23.609942!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5440d786ce7d%3A0x6ceef77586d9db1f!2sAv.%20Vida%20Nova%2C%2028%20-%20206b%20-%20Jardim%20Maria%20Rosa%2C%20Tabo%C3%A3o%20da%20Serra%20-%20SP%2C%2006764-045!5e0!3m2!1spt-BR!2sbr!4v1704575419141!5m2!1spt-BR!2sbr'
    ></iframe>
  );
}
