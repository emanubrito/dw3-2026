const tarefas = [
  { id: 1, descricao: "Estudar MVC", concluido: false }
]

export async function listar() {
  console.log("MODEL: listar")
  return tarefas
}

export async function criar(descricao) {
  console.log("MODEL: criar")

  const nova = {
    id: tarefas.length + 1,
    descricao,
    concluido: false
  }

  tarefas.push(nova)

  return nova
}