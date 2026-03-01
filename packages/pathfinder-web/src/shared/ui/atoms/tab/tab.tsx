import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { InlineBadge } from '../inline-badge/inline-badge'

type Props = {
  children: ReactNode
  count?: number
  isSelected?: boolean
  onClick?: () => void
  onClose?: (e: React.MouseEvent) => void
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
  max-width: 200px;
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

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 4px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  color: inherit;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`

export const Tab = ({
  children,
  count,
  onClick,
  isSelected,
  onClose,
}: Props) => {
  return (
    <StyledButton isSelected={isSelected} onClick={onClick}>
      {children}
      {count !== undefined && (
        <div>
          <InlineBadge count={count} />
        </div>
      )}
      {onClose && (
        <CloseButton onClick={onClose} title='Remove spec'>
          x
        </CloseButton>
      )}
    </StyledButton>
  )
}
