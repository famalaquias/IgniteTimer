import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { CyclesContext } from '../../../../contexts/CyclesContext'
import { FormContainer, TaskInput, MinutesAmountInput } from './styles'

export function NewCycleForm() {
  /* PROPRIEDADES RECEBIDAS DO CONTEXTO através do USECONTEXT: 
  recebe as propriedades/variáveis vindas do contexto da página Home */
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em:</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        /* se o ciclo estiver ativo, não permitir que o usuário digite
        nos inputs; 
        os !! significa que o valor tem que ser um booleano */
        disabled={!!activeCycle}
        /* o ... pega todas as informações que o register 
        retorna e acopla no input como se fosse propriedades */
        {...register('task')}
      />

      {/* datalist: lista de sugestões para um input, 
      baseada nas atividades que já fez */}
      <datalist id="task-suggestions">
        {/* cada sugestão é uma option */}
        <option value="Project 1" />
        <option value="Project 2" />
        <option value="Project 3" />
        <option value="Project 4" />
        <option value="Project 5" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        /* pula os minutos de 5 em 5 */
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
