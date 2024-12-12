import React from 'react'
import styled from 'styled-components'

import { GearsIcon } from '../../icons'

const Button = styled.button`
  appearance: none;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.main.dark.normal};
  background-color: ${({ theme }) => theme.colors.decorative.light.normal};
  border-radius: 100%;
  transition: 0.2s linear;
  cursor: pointer;

  svg path {
    transition: 0.2s linear;
  }

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.main.dark.normal};

    svg path {
      fill: ${({ theme }) => theme.colors.decorative.light.normal};
    }
  }
`

type Props = {
  onClick: () => void
}

export const PanelButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <GearsIcon />
    </Button>
  )
}

export default PanelButton
