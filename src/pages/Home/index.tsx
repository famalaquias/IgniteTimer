/* é a página de Timer */
import { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Countdow } from './components/Countdow'
import { NewCycleForm } from './components/NewCycleForm'
import { CyclesContext } from '../../contexts/CyclesContext'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDowButton,
} from './styles'

/* ZOD: cria schemas, validações */
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 05 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

/* Definindo o tipo de dados que o data irá receber;
o zod tem uma função dentro dele que extrai a tipagem do 
formulário, ou seja, a interface, de dentro do schema de validação */
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  /* FUNÇÕES */
  /* useForm: função que chamo dentro do componente Home e que
  devolve algumas informações - retorna um objeto. Possui duas
  propriedades:
  -> register: vai adicionar um input ao formulário - fala quais
  são os campos que vou ter no formulário; o register é uma função
  que retorna, basicamente, alguns métodos para trabalhar com inputs
  no javaScript, como onChange, onBlur, onFocus.
  -> handleSubmit: recebe uma função como parâmetro */
  const newCycleForm = useForm<NewCycleFormData>({
    /* objeto de configurações: utiliza um resolver de validação
    que é o zodResolver e dentro dele passa um schema de validação,
    ou seja, de que forma quer validar os dados dos inputs */
    resolver: zodResolver(newCycleFormValidationSchema),
    /* defaultValues: traz a possibilidade de passar o valor inicial
    de cada campo - valores vazios */
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  /* Essa função é chamada diretamente de um evento de onSubmit */
  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)

    /* Reseta o formulário */
    reset()
  }

  /* FUNÇÃO PARA DESABILITAR O BOTÃO: 
  vou observar o campo de task e se ele for diferente de vazio, 
  habilito o botão */
  const task = watch('task')
  const isSubmitDisabled = !task

  /* RETURN - RETORNO */
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        {/* Provider: envolta dos componentes - NewCycleForm e
        Countdow - que precisam acessar as propriedades criadas 
        no contexto */}
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdow />

        {/* se eu já tiver um ciclo rolando, mostre o botão de 
        encerrar o ciclo (Interromper); se não, mostre o botão de 
        iniciar um novo ciclo (Começar).
        
        disabled={isSubmitDisabled}: quero desabilitar meu botão de 
        Começar somente quando não tiver nada escrito dentro do
        task */}
        {activeCycle ? (
          <StopCountDowButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDowButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
