# Etapa 1: Build
FROM node:20-alpine AS builder

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos package.json e yarn.lock para instalar as dependências
COPY package.json yarn.lock ./

# Instale as dependências do projeto
RUN yarn install --frozen-lockfile

# Copie o restante do código do projeto para o contêiner
COPY . .

# Construa a aplicação Next.js
RUN yarn build

# Etapa 2: Runtime (produção)
FROM node:20-alpine AS runner

# Defina o diretório de trabalho no runtime
WORKDIR /app

# Copie o build da etapa anterior
COPY --from=builder /app/ ./

# Instale as dependências de produção
RUN yarn install --production --frozen-lockfile

# Defina a variável de ambiente para produção
ENV NODE_ENV production

# Exponha a porta que o Next.js vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "start"]
