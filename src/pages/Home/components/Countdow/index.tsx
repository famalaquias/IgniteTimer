import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'

import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountDowContainer, SeparatorContainer } from './styles'

export function Countdow() {
  /* PROPRIEDADES RECEBIDAS DO CONTEXTO através do USECONTEXT:
  recebe as propriedades/variáveis vindas do contexto da página Home */
  const {
    activeCycle,
    activeCycleId,
    amoutSecondsPassed,
    setSecondsPassed,
    markCurrentCycleAsFinished,
  } = useContext(CyclesContext)

  /* FUNÇÕES */
  /* mostrando as informações do ciclo na tela:
  totalSeconds: vai converter o número de minutos do ciclo em 
  segundos; se tiver um ciclo ativo, a variável activeCycle vai 
  ser o número de minutos do ciclo (minutesAmount) vezes 60 
  segundos; se não tiver um ciclo ativo, a variável activeCycle 
  vai ser 0 */
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    /* criando o intervalo: se tenho um ciclo ativo, vou dar um 
    setInterval a cada um segundo e calcular a diferença entre a 
    data atual e a data que o ciclo começou sem segundos */
    if (activeCycle) {
      interval = setInterval(() => {
        /* differenceInSeconds: calcula a diferença de segundos que
        já passaram da data atual para a data que começou o ciclo, 
        dentro de um intervalo de um segundo */
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        /* COMPLETANDO/ENCERRANDO O CICLO: */
        /* se a diferença em segundos - secondsDifference for 
        igual ou maior que o total de segundos - totalSeconds, o
        ciclo encerra, acaba e volta para 0 */
        if (secondsDifference >= totalSeconds) {
          /* marca o ciclo atual como finalizado */
          markCurrentCycleAsFinished()
          /* zerando o timer */
          setSecondsPassed(totalSeconds)
          /* parando/interrompendo o intervalo */
          clearInterval(interval)
        } else {
          /* a variável setSecondsPassed só será atualizada
          se ainda não completou o total de segundos */
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  /* como o timer reduz de 1 em 1 segundo será preciso a criação
  de um novo estado para armazenar o tanto de segundos que já se 
  passaram desde que o ciclo foi criado/iniciado.
  currentSeconds: vai fazer o cálculo dos segundos que já passou;
  se tiver um ciclo ativo, a variável activeCycle vai ser o total
  de segundos (totalSeconds) - quantos segundos já se passaram
  (amoutSecondsPassed); se não tiver um ciclo ativo, a variável
  activeCycle vai ser 0  */
  const currentSeconds = activeCycle ? totalSeconds - amoutSecondsPassed : 0

  /* agora que tenho o número de segundos atual - currentSeconds,
  é preciso converter essa variável em minutos e segundos para ser
  exibidas em tela. 
  Vou calcular a partir do total de segundos(currentSeconds),
  quantos minutos tenho dentro dele: pega o total de segundos
  (currentSeconds) e divide por 60 */
  /* Math.floor: sempre arredonda um número para baixo */
  const minutesAmount = Math.floor(currentSeconds / 60)
  /* Vou calcular quantos segundos tenho do resto dessa divisão,
  do currentSeconds */
  const secondsAmount = currentSeconds % 60

  /* minutes: vou converter o minutesAmount e o secondsAmount
  para uma string para usar o método padStart: preenche uma 
  string até um tamanho específico com algum caractere, por 
  exemplo, a variável de minutos, sempre quero que tenha dois 
  caracteres; se ela não tiver dois caracteres, vou incluir 0 
  no começo, ou seja, no start da string até completar dois 
  caracteres */
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  /* colocando o countDown(timer) no título da aba aberta que 
  estiver trabalhando: 
  se eu estiver um ciclo ativo - activeCycle, execute: toda vez 
  que meus minutos e secundos mudarem - [minutes, seconds], eu 
  quero atualizar o título da minha janela para uma string contendo
  minutos/segundos */
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountDowContainer>
      {/* para mostrar em tela transformo o 0 em minutes */}
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>

      <SeparatorContainer>:</SeparatorContainer>

      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDowContainer>
  )
}
