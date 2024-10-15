import style from './style.module.scss';

export default function Hero() {
  return (
    <section
      style={{ backgroundImage: `url('/assets/img/home.jpg')` }}
      className={style.hero}
    >
      <h1>Encontre a casa dos seus sonhos</h1>
      <button>
        <a href=''>Me mande uma mensagem</a>
      </button>
    </section>
  );
}
