# Exercício 2
## Como foi implementado o filtro por concluído?

Foi criado um filtro que permite listar apenas tarefas concluídas ou apenas tarefas pendentes. O valor é recebido pela rota, encaminhado pelo Controller e pelo Service até chegar ao Repository, onde a consulta SQL é executada.

## Esse filtro deveria ser resolvido no Controller?

Não. O Controller deve apenas receber a requisição e devolver a resposta ao cliente.

## Esse filtro deveria ser resolvido no Service?

Não. O Service é responsável pelas regras de negócio da aplicação, não pelo acesso direto aos dados.

## Esse filtro deveria ser resolvido no Repository?

Sim. O Repository é a camada responsável pelas consultas ao banco de dados, sendo o local correto para aplicar filtros utilizando SQL.