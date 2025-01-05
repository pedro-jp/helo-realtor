# Projeto

Este projeto é composto por três frentes principais: Frontend, Backend e Mobile. Abaixo está uma descrição detalhada de cada uma dessas frentes.

## Estrutura do Projeto
backend/ front-app/ front-model-1/ front-model-1-all/ mobile/

## Backend

O backend é responsável por fornecer APIs e gerenciar a lógica de negócios do aplicativo. Ele utiliza tecnologias como Node.js, Express e Prisma para gerenciar o banco de dados. A estrutura do backend inclui:

- `docker-compose.yml`: Arquivo de configuração do Docker Compose.
- `Dockerfile`: Arquivo de configuração do Docker.
- `nginx.conf`: Configuração do Nginx.
- `prisma/`: Diretório contendo os esquemas do Prisma.
- `src/`: Diretório contendo o código-fonte do backend.
- `swagger.json`: Documentação da API.
- `tsconfig.json`: Configuração do TypeScript.

## Frontend

O frontend é dividido em três partes: [`front-app`](front-app ), [`front-model-1`](front-model-1 ) e [`front-model-1-all`](front-model-1-all ). Cada uma dessas partes utiliza Next.js para renderização do lado do servidor e React para a construção da interface do usuário.

### front-app

- `next.config.mjs`: Configuração do Next.js.
- `public/`: Diretório contendo arquivos públicos.
- `src/`: Diretório contendo o código-fonte do frontend.
- `tsconfig.json`: Configuração do TypeScript.

### front-model-1

- `Dockerfile`: Arquivo de configuração do Docker.
- `next.config.mjs`: Configuração do Next.js.
- `public/`: Diretório contendo arquivos públicos.
- `src/`: Diretório contendo o código-fonte do frontend.
- `tailwind.config.js`: Configuração do Tailwind CSS.

### front-model-1-all

- Estrutura similar ao [`front-model-1`](front-model-1 ).

## Mobile

O aplicativo móvel é desenvolvido utilizando React Native e Expo. Ele inclui várias páginas e componentes estilizados com `styled-components`.

### Estrutura do Mobile

- `src/pages/AddImovel/index.tsx`: Página de categorias.
- `src/pages/AddImovel/styles.ts`: Estilos da página de categorias.
- `src/pages/Home/index.tsx`: Página inicial.
- `src/pages/Home/styles.ts`: Estilos da página inicial.
- `src/pages/AddImovel/index.tsx`: Página de adição de imóveis.
- `src/pages/AddImovel/styles.ts`: Estilos da página de adição de imóveis.
- `src/components/SubscribeView.tsx`: Componente de assinatura.

### Funcionalidades do Mobile

- **Página de Categorias**: Permite ao usuário adicionar e visualizar categorias.
- **Página Inicial**: Exibe a interface principal do aplicativo.
- **Página de Adição de Imóveis**: Permite ao usuário adicionar novos imóveis.
- **Componente de Assinatura**: Gerencia a assinatura do usuário.

## Como Executar

### Backend

1. Navegue até o diretório `backend`.
2. Execute `docker-compose up` para iniciar os serviços.

### Frontend

1. Navegue até o diretório `front-app`, `front-model-1` ou `front-model-1-all`.
2. Execute `npm install` para instalar as dependências.
3. Execute `npm run dev` para iniciar o servidor de desenvolvimento.

### Mobile

1. Navegue até o diretório `mobile`.
2. Execute `npm install` para instalar as dependências.
3. Execute `expo start` para iniciar o aplicativo no Expo.

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Faça um fork do repositório, crie uma branch para suas alterações e envie um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.
