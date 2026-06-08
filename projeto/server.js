// @file: src/server.js
import Fastify from 'fastify'
import tarefaRoutes from './features//tarefa.routes.js'
import { AppError } from './errors/AppError.js'
import produtoRoutes from "./modules/produtos/produto.routes.js";
import { errorHandler } from "./shared/http/error-handler.js";
import 'dotenv/config'

const server = Fastify({ logger: true })

server.register(produtoRoutes);

server.setErrorHandler(errorHandler);

server.register(tarefaRoutes)

const start = async () => {
  try {
    await server.listen({ port: 3000 })

    console.log("Servidor rodando")
  } catch (err) {
    console.error(err)
  }
}

start()