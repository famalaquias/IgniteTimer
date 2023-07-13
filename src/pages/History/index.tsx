/* é a página de histórico dos últimos Timers executados */
import { useContext } from 'react'

import ptBR from 'date-fns/locale/pt-BR'
import { formatDistanceToNow } from 'date-fns'

import { CyclesContext } from '../../contexts/CyclesContext'

import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {/* Listagem do Histórico */}
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {/* FORMATAÇÃO DA DATA DE INÍCIO */}
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {/* se o ciclo tiver a informação finishedDate então 
                    mostre o componente de status Concluído */}
                    {cycle.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}

                    {/* se o ciclo tiver a informação interruptedDate então 
                    mostre o componente de status Interrompido */}
                    {cycle.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}

                    {/* se o ciclo não tiver a informação interruptedDate 
                    e a informação finishedDate, então mostre o componente de 
                    status Em andamento */}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
