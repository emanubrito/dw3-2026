# Exercício 1

## Como impedir tarefa sem projeto?

Para impedir o cadastro de uma tarefa sem projeto, foi adicionada uma validação no `Service`, verificando se o campo `projetoId` foi informado antes de salvar a tarefa.

```js
if (!dados.projetoId) {
  throw new AppError('O projeto é obrigatório', 400)
}
```

## Essa validação deve ficar no Controller?

O Controller pode receber os dados da requisição, mas não deve concentrar essa regra. Ele deve apenas repassar as informações para o Service.

## Essa validação deve ficar no Service?

Sim. O Service é o melhor lugar para essa validação, porque impedir uma tarefa sem projeto é uma regra da aplicação.

## Pode ficar em ambos?

Pode, mas com responsabilidades diferentes. O Controller pode verificar se o corpo da requisição veio corretamente, enquanto o Service valida a regra principal do sistema.

# Exercício 2

## Como buscar tarefas de um projeto?

Foi criada uma forma de filtrar tarefas por projeto usando o `projetoId`. A ideia é permitir uma requisição como:

```http
GET /tarefas?projetoId=1
```

No Repository, esse filtro é aplicado na consulta SQL:

```sql
WHERE t.projeto_id = $1
```

Assim, a API retorna apenas as tarefas vinculadas ao projeto informado.

# Exercício 3

## Como melhorar a resposta para o frontend?

Em vez de retornar `projeto_id` e `projeto_nome` separados, a resposta pode ser organizada com um objeto `projeto`.

Exemplo:

```json
{
  "id": 7,
  "descricao": "Criar integração entre projetos e tarefas",
  "concluido": false,
  "projeto": {
    "id": 1,
    "nome": "Projeto API DW3"
  }
}
```

## Onde essa transformação deveria acontecer?

Essa transformação pode acontecer no Service, porque ele organiza os dados antes de entregar para o Controller. O Repository deve buscar os dados no banco, mas não precisa decidir o formato final da resposta da API. O Controller deve apenas enviar a resposta ao cliente.

# Exercício 4

## 1. Por que usar LEFT JOIN na listagem geral e INNER JOIN na busca por projeto?

A listagem geral usa `LEFT JOIN` porque ela deve mostrar todas as tarefas, inclusive as antigas que ainda não possuem projeto vinculado. Nesse caso, uma tarefa sem projeto aparece com os dados do projeto como `null`.

Já a busca por projeto usa `INNER JOIN` porque o objetivo é listar somente tarefas que pertencem a um projeto específico. Uma tarefa sem projeto não deve aparecer nessa consulta.

Exemplo: uma tarefa antiga, com `projeto_id` vazio, aparece na listagem geral, mas não aparece ao buscar tarefas do projeto 1.

## 2. A chave estrangeira projeto_id resolve o caso de várias tags?

Não. A chave estrangeira `projeto_id` resolve um relacionamento 1:N, em que uma tarefa pertence a um projeto e um projeto pode ter várias tarefas.

No caso das tags, a relação é diferente: uma tarefa pode ter várias tags e uma tag pode pertencer a várias tarefas. Isso é um relacionamento N:N.

## 3. Como representar esse novo cenário?

Uma forma de representar seria criar três tabelas:

```txt
tarefas
- id
- descricao
- concluido

tags
- id
- nome

tarefas_tags
- tarefa_id
- tag_id
```

A tabela `tarefas_tags` serviria para ligar tarefas e tags. Assim, uma tarefa poderia ter várias tags, e a mesma tag poderia estar relacionada a várias tarefas.
