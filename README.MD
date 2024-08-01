[JAVASCRIPT__BADGE]: https://img.shields.io/badge/Javascript-000?style=for-the-badge&logo=javascript
[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[EXPRESS__BADGE]: https://img.shields.io/badge/express-005CFE?style=for-the-badge&logo=express
[NODEJS__BADGE]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[PRISMA__BADGE]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[DOCKER__BADGE]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white

# Documentacao API

![javascript][JAVASCRIPT__BADGE]
![typescript][TYPESCRIPT__BADGE]
![express][EXPRESS__BADGE]
![node.js][NODEJS__BADGE]
![prisma][PRISMA__BADGE]
![docker][DOCKER__BADGE]

- APi refente a um serviço básico, no qual existe autenticação de usuario com JWT

## Prerequisitos

- NodeJS (version 21.0.0)
- Npm (version 10.2.0)
- Docker (version 26.1.2)

## Banco de dados 💻

download dependencies: `npm install`

Create container: `docker compose up -d`

Start container: `sudo docker start tributario-pg`

Stop container: `sudo docker stop tributario-pg`

Create Database: `npx prisma migrate dev`

Start Server: `npm run dev`

## Criação do Usuário

É necessario a conexao com um SGBD, com dados informados(usuário, banco de dados, senha) no arquivo 'docker-compose.yml'

A criação do Usuário vem atraves de um comando SQL

Primeiro certifique-se de que a extensão `pgcrypto` está instalada no seu banco de dados através desse comando:

`CREATE EXTENSION IF NOT EXISTS pgcrypto;`

Após isso execute o comando SQL:

`INSERT INTO users (email, name, login, password) VALUES ('teste@teste.com', 'teste', 'teste1', digest('123456','sha256'));`
