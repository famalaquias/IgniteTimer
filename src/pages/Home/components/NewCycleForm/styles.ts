import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  font-size: 1.125rem;
  font-weight: bold;
  /* quando a tela for menor, quero que quebre a linha */
  flex-wrap: wrap;

  color: ${(props) => props.theme['gray-100']};
`
const BaseInput = styled.input`
  height: 2.5rem;
  border: 0;

  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;

  background: transparent;
  color: ${(props) => props.theme['gray-100']};
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  /* Tira a flexinha de opções do input*/
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
