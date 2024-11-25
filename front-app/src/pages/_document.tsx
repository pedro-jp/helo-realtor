import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='pt-BR'>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
        <meta
          name='description'
          content='Encontre aqui os melhores imóveis de sua cidade'
        />
        <meta property='og:title' content='IntG Realtor' />
        <meta
          property='og:description'
          content='Encontre aqui os melhores imóveis de sua cidade'
        />
        <meta property='og:url' content='https://realtor.intg.com.br' />
        <link rel='icon' href='/favicon.ico' sizes='16x16' />
        <link rel='icon' href='/favicon.ico' sizes='32x32' />
        <link rel='icon' href='/favicon.ico' sizes='48x48' />
        <link rel='apple-touch-icon' href='/favicon.ico' />

        {/* Outros ícones (opcional) */}
        <link rel='icon' href='/favicon.png' sizes='32x32' />
        <link rel='apple-touch-icon' href='/favicon.png' sizes='180x180' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
