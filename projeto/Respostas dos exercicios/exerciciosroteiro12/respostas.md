# Exercício 1

## O que o Client resolve bem?

O `Client` é uma boa opção para testes iniciais e aplicações mais simples, porque ele cria uma conexão direta com o banco de dados. Ele foi suficiente nos primeiros roteiros, quando o objetivo era apenas verificar se a aplicação conseguia se conectar ao PostgreSQL.

## Por que o Pool passa a fazer mais sentido neste ponto da trilha?

O `Pool` faz mais sentido agora porque a aplicação passou a usar o banco o tempo todo. Como ele gerencia várias conexões e reaproveita as que já existem, o acesso ao banco fica mais organizado e eficiente.

## Por que esse assunto só aparece agora?

Porque primeiro foi necessário aprender a conectar a aplicação ao banco e usar SQL nas consultas. Só depois que o banco passou a fazer parte do funcionamento normal da API surgiu a necessidade de organizar melhor as conexões.

# Exercício 2

## Qual configuração foi adicionada ao Pool?

Foi adicionada a configuração `max` e `idleTimeoutMillis`.

```js
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000
})
```

## Qual o papel dessas configurações?

A configuração `max` define quantas conexões podem ficar abertas ao mesmo tempo. Já `idleTimeoutMillis` define quanto tempo uma conexão pode ficar parada antes de ser fechada automaticamente. Isso ajuda a controlar melhor os recursos utilizados pela aplicação.

# Exercício 3

## Três coisas que pertencem ao módulo database

* Configuração da conexão com o banco;
* Criação do Pool;
* Uso da variável `DATABASE_URL`.

## Três coisas que pertencem ao Repository

* Escrever consultas SQL;
* Buscar dados no banco;
* Salvar, atualizar e remover registros.

## Por que essa separação é importante?

Porque deixa o código mais organizado. O módulo `database` cuida da conexão com o banco, enquanto o `Repository` fica responsável apenas pelas operações com os dados.

# Exercício 4

## O que mudou do Roteiro 10 para o Roteiro 11?

No Roteiro 10, o banco foi conectado à aplicação e a conexão foi testada. Já no Roteiro 11, a API passou a usar o PostgreSQL de verdade, e as consultas SQL foram movidas para o `Repository`.

## O que mudou do Roteiro 11 para o Roteiro 12?

No Roteiro 12, a principal mudança foi a forma de conectar ao banco. A aplicação deixou de usar uma conexão simples e passou a usar `Pool`, que gerencia melhor as conexões.

## Por que essas mudanças aconteceram nessa ordem?

Essas mudanças aconteceram nessa ordem porque primeiro era preciso fazer a aplicação se conectar ao banco. Depois, foi necessário colocar o SQL na camada correta. Só então fez sentido melhorar a infraestrutura da conexão, já que o banco passou a ser usado constantemente pela aplicação.
