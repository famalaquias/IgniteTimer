import { produce } from 'immer'
import { ActionType } from './actions'

/* PROPRIEDADES QUE POSSUEM NO CICLO:
formato da aplicação dos ciclos ativos em si */
export interface Cycle {
  /* para identificar cada ciclo de forma única */
  id: string
  /* para identificar qual tarefa estamos trabalhando */
  task: string
  /* para identificar a quantidade de minutos para executar a tarefa */
  minutesAmount: number
  /* a data que o timer ficou ativo para saber quanto tempo passou */
  startDate: Date
  /* a data que o timer foi interrompido; é opcional, pois a pessoa
  pode não interromper o ciclo */
  interruptedDate?: Date
  /* a data que o timer encerra/acaba/volta a 0 */
  finishedDate?: Date
}

/* Estados do meu ciclo, ou seja, o tipo das informações que vou
salvar dentro do reducer */
interface CyclesState {
  /* possue um array de ciclos */
  cycles: Cycle[]
  /* possue um ciclo ativo (null: caso não esteja ativo) */
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  /* USANDO SWITCH/CASE */
  switch (action.type) {
    /* ADICIONANDO UM NOVO CICLO - deve-se retornar um array
    de objeto */
    case ActionType.ADD_NEW_CYCLE:
      /* state: informação que quero modificar;
      draft: onde será feito as alterações */
      return produce(state, (draft) => {
        /* adiconando uma nova informação dentro do array de ciclos */
        draft.cycles.push(action.payload.newCycle)
        /* seta o ciclo recém criado como sendo o ciclo ativo */
        draft.activeCycleId = action.payload.newCycle.id
      })

    /* INTERROMPENDO UM CICLO - seta o ciclo ativo(setActiveCycleId) 
    de volta para nullo */
    case ActionType.INTERRUPT_CURRENT_CYCLE: {
      /* findIndex: procura o indíce, nesse array de ciclos, do 
      ciclo que está ativo atualmente e procuro dentro do ciclo, 
      qual é o ciclo que o ID for igual ao activeCycleId */
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      /* se o currentCycleIndex retornar um valor abaixo de 0,
      retorna o estado SEM NENHUMA ALTERAÇÃO; */
      if (currentCycleIndex < 0) {
        return state
      }

      /* state: informação que quero modificar;
      draft: onde será feito as alterações */
      return produce(state, (draft) => {
        /* zera o timer quando o interrompe */
        draft.activeCycleId = null
        /* colocando a data de interrupção */
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }

    /* MARCANDO UM CICLO COMO FINALIZADO */
    case ActionType.MARK_CURRENT_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      /* se o currentCycleIndex retornar um valor abaixo de 0,
      retorna o estado SEM NENHUMA ALTERAÇÃO; */
      if (currentCycleIndex < 0) {
        return state
      }

      /* state: informação que quero modificar;
      draft: onde será feito as alterações */
      return produce(state, (draft) => {
        /* zera o timer quando o interrompe */
        draft.activeCycleId = null
        /* colocando a data de interrupção */
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
