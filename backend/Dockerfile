# Use uma imagem oficial do Node.js como base
FROM node:16

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json (se houver)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código da aplicação para o container
COPY . .

# Gere o cliente do Prisma
RUN npx prisma generate

# Compile o TypeScript para gerar os arquivos em /dist
RUN npm run build

# Exponha a porta que a aplicação usa
EXPOSE 3332

# Comando para rodar a aplicação
CMD ["npm", "start"]
