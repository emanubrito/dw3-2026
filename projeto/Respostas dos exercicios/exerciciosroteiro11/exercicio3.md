# Exercício 3
## Como foi implementado o resumo com dados reais?

O resumo foi implementado utilizando consultas SQL diretamente no PostgreSQL para contar a quantidade total de tarefas, tarefas concluídas e tarefas pendentes.

## Qual seria a alternativa?

Uma alternativa seria buscar todas as tarefas do banco e realizar os cálculos na memória da aplicação.

## Qual abordagem é melhor?

A consulta SQL é mais eficiente, pois o próprio banco de dados realiza os cálculos e devolve apenas os resultados necessários. Isso reduz o processamento da aplicação e a quantidade de dados transferidos.