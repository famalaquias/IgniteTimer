import { Outlet } from 'react-router-dom'

import { Header } from '../../components/Header'

import { LayoutContainer } from './styles'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />

      {/* Outlet: é um espaço para ser inserido um conteúdo específico */}
      <Outlet />
    </LayoutContainer>
  )
}
