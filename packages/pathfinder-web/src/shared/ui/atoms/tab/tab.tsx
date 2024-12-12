import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Badge } from '../badge'

type Props = {
  children: ReactNode
  count?: number
  onClick?: () => void
}

const StyledButton = styled.button`
  position: relative;
  border-radius: 0;
  border: 0;
  border-right: 1px solid;
  &:first-child {
    border-left: 1px solid;
  }
  padding: 10px;
  min-width: 40px;
  min-height: 40px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main.light.normal};
  &:hover {
    background-color: ${({ theme }) => theme.colors.main.primary.normal};
  }
  &:focus {
    background-color: ${({ theme }) => theme.colors.main.primary.normal};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.main.primary.translucent};
  }
  cursor: pointer;
`

export const Tab = ({ children, count, onClick }: Props) => {
  return (
    <StyledButton onClick={onClick}>
      {count && <Badge count={count} />}
      {children}
    </StyledButton>
  )
}
