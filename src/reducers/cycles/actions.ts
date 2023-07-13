/* FUNÇÃO QUE RETORNARÁ O CONTEÚDO DO DISPATCH */
import { Cycle } from './reducer'

/* Tipos de action */
export enum ActionType {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_AS_FINISHED = 'MARK_CURRENT_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    /* nome da ação que quer realizar */
    type: ActionType.ADD_NEW_CYCLE,
    /* dados do novo ciclo */
    payload: {
      newCycle,
    },
  }
}

export function markCurrentCycleAsFinishedAction() {
  /* função retornará o conteúdo do dispatch */
  return {
    /* nome da ação que quer realizar */
    type: ActionType.MARK_CURRENT_AS_FINISHED,
  }
}

export function interruptCurrentCycleAction() {
  /* função retornará o conteúdo do dispatch */
  return {
    /* nome da ação que quer realizar */
    type: ActionType.INTERRUPT_CURRENT_CYCLE,
  }
}
