import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { InlineBadge } from '../inline-badge/inline-badge'

type Props = {
  children: ReactNode
  count?: number
  isSelected?: boolean
  onClick?: () => void
}

const StyledButton = styled.button<{ isSelected?: boolean }>`
  position: relative;
  border-radius: 0;
  border: 0;
  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  padding: 16px;
  min-width: 40px;
  opacity: 0.5;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  ${({ isSelected }) =>
    isSelected &&
    css`
      opacity: 1;
      background-color: ${() => '#E5E5E9'};
    `}

  &:hover {
    background-color: ${() => '#E5E5E9'};
  }
  cursor: pointer;
`

export const Tab = ({ children, count, onClick, isSelected }: Props) => {
  return (
    <StyledButton isSelected={isSelected} onClick={onClick}>
      {children}
      {count && (
        <div>
          <InlineBadge count={count} />
        </div>
      )}
    </StyledButton>
  )
}
