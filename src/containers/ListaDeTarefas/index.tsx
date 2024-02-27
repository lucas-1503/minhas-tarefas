import { useSelector } from 'react-redux'
import Tarefa from '../../components/Tarefa'
import { MainContainer, Titulo } from '../../styles'
import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraTarefas = () => {
    let tarefasFiltradas = itens
    if (termo !== undefined) {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )

      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.status === valor
        )
      }
      return tarefasFiltradas
    } else {
      return itens
    }
  }

  const exibeTarefasFiltradas = (quantidade: number) => {
    let mensagem = ''
    if (criterio === 'todas') {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: todas ${
        termo !== undefined && termo.length > 0 ? `"${termo}"` : ' '
      } `
    } else {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como:  "${`${criterio} = ${valor}`}" ${
        termo !== undefined && termo.length > 0 ? `"${termo}"` : ' '
      } `
    }

    return mensagem
  }

  const tarefas = filtraTarefas()
  const mensagem = exibeTarefasFiltradas(tarefas.length)

  return (
    <MainContainer>
      <Titulo as={'p'}>{mensagem}</Titulo>
      <ul>
        {tarefas.map((t) => (
          <li key={t.titulo}>
            <Tarefa
              id={t.id}
              descricao={t.descricao}
              titulo={t.titulo}
              status={t.status}
              prioridade={t.prioridade}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeTarefas
