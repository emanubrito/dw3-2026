# Exercício 4

## Por que o SQL de laboratório não deveria continuar no server.js?

O SQL de laboratório não deveria continuar no server.js porque esse arquivo deve apenas iniciar a aplicação e registrar as rotas. Deixar consultas SQL nele mistura responsabilidades e dificulta a manutenção do sistema.

## Por que o Repository é o lugar correto para acesso a dados?

O Repository é a camada responsável por acessar, salvar, atualizar e remover dados. Como as consultas SQL fazem parte da persistência, elas devem ficar concentradas nessa camada.

## O que mudou e o que não mudou na arquitetura?

Mudou a forma de armazenamento dos dados, que antes estavam em um array em memória e agora estão no PostgreSQL. O que não mudou foi a responsabilidade das camadas: Controller continua tratando requisições HTTP, Service continua aplicando regras de negócio e Repository continua responsável pelo acesso aos dados.