# SQL puro
SELECT id, descricao, concluido
FROM tarefas
ORDER BY id;

# Drizzle
const lista = await db
  .select()
  .from(tarefas)
  .orderBy(tarefas.id)

# Comparação

No SQL puro, a consulta é escrita diretamente em SQL, o que dá mais controle e deixa a comunicação com o banco mais explícita. No Drizzle, a consulta é escrita em JavaScript usando o schema definido anteriormente. O Drizzle deixa o código mais integrado à aplicação e pode reduzir código repetitivo, mas cria uma camada de abstração sobre o SQL. O SQL puro é mais próximo do banco de dados, enquanto o Drizzle facilita a organização e integração com o código da aplicação.