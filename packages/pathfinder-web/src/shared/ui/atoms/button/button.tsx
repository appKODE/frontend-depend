import React, { memo, MouseEventHandler, ReactNode } from 'react'
import styled, { css, useTheme } from 'styled-components'

import { TButtonColors, TButtonVariant } from './types'

const ButtonWrapper = styled.button<{
  $text: string
  $background: string
  $border: string
  $active?: boolean
}>`
  appearance: none;
  margin: 0;
  padding: 3px 6px;
  display: flex;
  align-content: center;
  justify-content: center;
  outline: none;
  border: 1px solid ${({ $border }) => $border};
  border-radius: 4px;
  background-color: ${({ $background }) => $background};
  color: ${({ $text }) => $text};
  transition: 0.3s ease;
  cursor: pointer;

  ${({ $active, $background }) =>
    $active &&
    css`
      &:hover {
        background-color: ${$background};
      }
    `}

  &:focus:not(:active) {
    outline: 1px solid ${({ theme }) => theme.colors.digital.blue.normal};
  }

  &:active {
    transform: scale(0.96);
  }

  svg path {
    transition: 0.2s linear;
  }

  &:hover {
    svg path {
      opacity: 0.8;
    }
  }
`

type Props = {
  children: ReactNode
  title?: string
  transparent?: boolean
  active?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = memo(
  ({ children, title, transparent, active, onClick }: Props) => {
    const theme = useTheme()
    const variant: TButtonVariant = active
      ? 'active'
      : transparent
        ? 'transparent'
        : 'normal'
    const colors: Record<TButtonVariant, TButtonColors> = {
      active: {
        background: theme.colors.main.secondary.normal,
        border: theme.colors.main.dark.normal,
        text: theme.colors.main.light.normal,
      },
      transparent: {
        background: 'transparent',
        border: 'transparent',
        text: theme.colors.main.dark.translucent,
      },
      normal: {
        background: theme.colors.main.primary.normal,
        border: theme.colors.main.dark.normal,
        text: theme.colors.main.dark.translucent,
      },
    }

    return (
      <ButtonWrapper
        $text={colors[variant].text}
        $background={colors[variant].background}
        $border={colors[variant].border}
        $active={active}
        onClick={onClick}
        title={title}>
        {children}
      </ButtonWrapper>
    )
  },
)
