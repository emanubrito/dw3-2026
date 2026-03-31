import Fastify from 'fastify'
import cors from '@fastify/cors'



const server = Fastify({ logger: false })

// Registramos o plugin de CORS para permitir que qualquer origem acesse nossa API
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

// Banco de dados
const tarefas = [
  { id: 1, descricao: "Estudar Node", concluido: false },
  { id: 2, descricao: "Comprar comida", concluido: true },
  { id: 3, descricao: "Estudar Fastify", concluido: false }
]

server.get('/tarefas/resumo', async (request, reply) => {

  const total = tarefas.length

  const concluidas = tarefas.filter(t => t.concluido).length

  const pendentes = total - concluidas

  return {
    total,
    concluidas,
    pendentes
  }
})

server.patch('/tarefas/:id/concluir', async (request, reply) => {

  const id = Number(request.params.id)

  const index = tarefas.findIndex(t => t.id === id)

  // não encontrou
  if (index === -1) {
    return reply.code(404).send({
      status: 'error',
      message: 'Tarefa não encontrada'
    })
  }

  // inverter o valor
  tarefas[index].concluido = !tarefas[index].concluido

  // retorna a tarefa atualizada
  return tarefas[index]
})

// Rota principal
server.get('/', async (request, reply) => {
  return 'Bem-vindo à página inicial!'
})

// Rota /sobre
server.get('/sobre', async (request, reply) => {
  return 'Esta é a página Sobre.'
})

// Rota /contato
server.get('/contato', async (request, reply) => {
  return 'Página de contato.'
})


// EXERCÍCIO 1 — GET /tarefas com filtros
server.get('/tarefas', async (request, reply) => {

  const { busca, concluido } = request.query

  let resultado = tarefas

  if (busca) {
    resultado = resultado.filter(t =>
      t.descricao.toLowerCase().includes(busca.toLowerCase())
    )
  }

  if (concluido !== undefined) {
    resultado = resultado.filter(t =>
      String(t.concluido) === concluido
    )
  }

  return resultado
})


// EXERCÍCIO 2 — POST /tarefas com validação
server.post('/tarefas', async (request, reply) => {

  const { descricao, concluido } = request.body

  //  validação
  if (!descricao || descricao.trim() === '') {
    return reply.code(400).send({
      status: 'error',
      message: 'A descrição é obrigatória'
    })
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    descricao,
    concluido: concluido ?? false
  }

  tarefas.push(novaTarefa)

  return reply.code(201).send(novaTarefa)
})


// 404 personalizado
server.setNotFoundHandler(async (request, reply) => {
  reply.code(404).send('Página não encontrada.')
})


// servidor
const PORT = 3002

try {
  await server.listen({ port: PORT })
  console.log(`Servidor rodando com FASTIFY na porta ${PORT}`)
} catch (err) {
  server.log.error(err)
  process.exit(1)
}