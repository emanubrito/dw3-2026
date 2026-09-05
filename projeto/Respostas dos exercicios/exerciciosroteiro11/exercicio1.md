# Exercício 1
## Como foi implementado o filtro por descrição?

O método de listagem foi adaptado para receber um filtro opcional de descrição. Quando o usuário informa um texto para busca, a consulta SQL retorna apenas as tarefas cuja descrição contém o texto informado. Quando nenhum filtro é enviado, todas as tarefas são retornadas normalmente.

## Em qual camada o filtro foi implementado?

O filtro foi implementado no Repository, pois é a camada responsável pelo acesso aos dados e pela execução das consultas SQL.

## Qual a vantagem dessa abordagem?

A principal vantagem é que a filtragem acontece diretamente no banco de dados, reduzindo a quantidade de informações enviadas para a aplicação e mantendo a arquitetura organizada.