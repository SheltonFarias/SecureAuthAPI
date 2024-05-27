# Documentacao API de login
- APi refente a um servico de login, no qual existe autenticação de usuario com token 

## tecnologias Utilizadas
- NodeJS (version 21.0.0)
- Npm (version 10.2.0)

## Banco de dados
- 
<!-- - O banco de dados se encontra dentro de um container docker as especificações estao presente no arquivo
 docker-compose.yml 
- para criação do container com base nesse arquivo e necesssario o uso do comando "docker compose up -d"
- Quando a Api for usada e necessario executar um start no container para que o DB seja inicializado atraves do comando 
- "sudo docker start tributario-pg" quando for aplicação linux 
- em aplicação windows e usado somente "docker start tributario-pg"
- para parar o container e utilizado o comando "docker stop tributario-pg" -->

## Inicialização do Banco de Dados 
- A inialização do Bando de dados e criação de tabela e feita pelo framework prisma
- A API tem presente uma pasta prisma na qual contem os schemas que são utilizados para que a aplicação ocorra
- o comando utilizado para a criação das tabelas e "npx prisma migrate dev"

## Servidor local 
- utilizado o nodemon e inciado com o comando "npm run dev"
