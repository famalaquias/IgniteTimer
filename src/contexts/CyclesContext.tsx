import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

import { differenceInSeconds } from 'date-fns'

import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'

/* PROPRIEDADES PARA CRIAÇÃO DE UM NOVO CICLO */
interface CreateCycleData {
  task: string
  minutesAmount: number
}

/* INFORMAÇÕES ARMAZENADAS DENTRO DO CONTEXTO - CONTEXT */
interface CyclesContextType {
  cycles: Cycle[]
  /* activeCycle será um ciclo ativo - Cycle OU quando não tiver 
  nenhum ciclo ativo no momento - Undefined */
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amoutSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

/* CRIANDO CONTEXTOS - CREATECONTEXT:
cria o contexto para passar as propriedades armazenadas dentro do
CyclesContextType */
export const CyclesContext = createContext({} as CyclesContextType)

/* Propriedades que o componente recebe */
interface CycleContextProviderProps {
  /* ReactNode: qualquer HTML, JSX válido */
  children: ReactNode
}

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  /* REDUCERS */
  /* o reducer irá armazenar uma lista/array de ciclos - Cycle;
  possui dois parâmetros: uma função e o valor inicial dos ciclos,
  que é um array vazio - [] */

  /* a função recebe todas as ações de modificações nesse estado,
  recebe dois parâmetros:
    - state: valor atual, em tempo real do ciclo; e
    - action: ação de alteração do estado -state; */

  /* dispatch: é um método para disparar uma ação/ um funcionamento */
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      /* agora, tanto os valores do ciclo (cycles) quanto os valores
      do ciclo ativo (activeCycleId) vão ser controlados por um único
      estado, que é o reducers */
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      /* RECUPERANDO OS DADOS SALVOS NO LOCALSTORAGE: a função é
      disparada assim que o reducer for criado para recuperar os dados
      iniciais de algum outro lugar */
      const storeStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      /* se encontrar algum dado, retorna um JSON.parse nesse storage */
      if (storeStateAsJSON) {
        return JSON.parse(storeStateAsJSON)
      }

      /* se não tiver nada no storage, retorne o reduce vazio:
      { cycles: [],
        activeCycleId: null,
      } */
      return initialState
    },
  )

  /* irá controlar qual o ciclo está ativo no momento,
  com base no ID */
  const { cycles, activeCycleId } = cyclesState

  /* mostrando na tela qual o ciclo ativo: cria uma variável 
  (activeCycle) que, com base no ID do ciclo ativo, percorre todos
  os ciclos que tenho e retornar qual é o ciclo que tem o mesmo ID
  do ciclo ativo. 
  Logo, a variável criada vai percorrer o vetor de ciclos(cycles)
  e vai encontrar(find) um ciclo (cycle) em que o id (cycle.id) 
  seja igual ao id do ciclo ativo (activeCycleId) */
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  /* o estado irá armazenar o total de segundos que já se passaram 
  desde que o ciclo foi criado/iniciado;
  o amoutSecondsPassed não será mais iniciado com 0 */
  const [amoutSecondsPassed, setAmoutSecondsPassed] = useState(() => {
    if (activeCycle) {
      /* differenceInSeconds: calcula a diferença de segundos que
      já passaram da data atual para a data que começou o ciclo, 
      dentro de um intervalo de um segundo */
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  /* LOCALSTORAGE: toda vez que o cyclesState mudar, salva as 
  informações no localStorage em si */
  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function setSecondsPassed(seconds: number) {
    setAmoutSecondsPassed(seconds)
  }

  /* FUNÇÃO PARA MARCAR O CICLO ATUAL COMO FINALIZADO:
  recebe o ID(cycleId) do ciclo que quer marcar como finalizado */
  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  /* FUNÇÃO PARA CRIAR UM NOVO CICLO: */
  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      /* pega a data atual convertida em milisegundos */
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    /* resetando o valor dos segundos que já se passaram */
    setAmoutSecondsPassed(0)
  }

  /* FUNÇÃO PARA INTERROMPER CICLO: */
  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    /* Provider: envolta dos componentes - NewCycleForm e
    Countdow - que precisam acessar as propriedades criadas 
    no contexto */
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amoutSecondsPassed,
        setSecondsPassed,
        markCurrentCycleAsFinished,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
