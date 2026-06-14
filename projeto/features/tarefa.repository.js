// @file: src/features/tarefa.repository.js
import pool from '../database/pool.js'

export class TarefaRepository {
  async buscarTodos(filtros = {}) {
    const condicoes = []
    const valores = []

    if (filtros.busca) {
      valores.push(`%${filtros.busca}%`)
      condicoes.push(`descricao ILIKE $${valores.length}`)
    }

    if (filtros.status) {
      const concluido = filtros.status === 'concluida'
      valores.push(concluido)
      condicoes.push(`concluido = $${valores.length}`)
    }

    let sql = `
      SELECT id, descricao, concluido, criada_em
      FROM tarefas
    `

    if (condicoes.length > 0) {
      sql += ` WHERE ${condicoes.join(' AND ')}`
    }

    sql += ` ORDER BY id`

    const resultado = await pool.query(sql, valores)
    return resultado.rows
  }

  async buscarPorId(id) {
    const resultado = await pool.query(
      `
        SELECT id, descricao, concluido, criada_em
        FROM tarefas
        WHERE id = $1
      `,
      [id]
    )

    return resultado.rows[0] ?? null
  }

  async salvar(tarefa) {
    const resultado = await pool.query(
      `
        INSERT INTO tarefas (descricao, concluido)
        VALUES ($1, $2)
        RETURNING id, descricao, concluido, criada_em
      `,
      [tarefa.descricao, tarefa.concluido]
    )

    return resultado.rows[0]
  }

  async atualizar(id, dadosAtualizados) {
    const tarefaAtual = await this.buscarPorId(id)

    if (!tarefaAtual) return null

    const tarefaFinal = {
      ...tarefaAtual,
      ...dadosAtualizados,
      id: tarefaAtual.id
    }

    const resultado = await pool.query(
      `
        UPDATE tarefas
        SET descricao = $1,
            concluido = $2
        WHERE id = $3
        RETURNING id, descricao, concluido, criada_em
      `,
      [tarefaFinal.descricao, tarefaFinal.concluido, id]
    )

    return resultado.rows[0] ?? null
  }

  async remover(id) {
    const resultado = await pool.query(
      `
        DELETE FROM tarefas
        WHERE id = $1
      `,
      [id]
    )

    return resultado.rowCount > 0
  }

  async resumo() {
    const resultado = await pool.query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE concluido = true)::int AS concluidas,
        COUNT(*) FILTER (WHERE concluido = false)::int AS pendentes
      FROM tarefas
    `)

    return resultado.rows[0]
  }
}