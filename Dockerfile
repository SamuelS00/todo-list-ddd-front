FROM node:16-alpine

# Diretório de trabalho
WORKDIR app

# Copia os arquivos necessários para a imagem
COPY package*.json ./
COPY yarn.lock ./
COPY . .

# Instala as dependências do projeto
RUN yarn install --frozen-lockfile

# Expõe a porta em que o servidor estará rodando
EXPOSE 3001

CMD ["tail", "-f", "/dev/null"]

