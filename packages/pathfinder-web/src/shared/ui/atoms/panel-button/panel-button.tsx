import React from 'react'
import styled from 'styled-components'

import { GearsIcon } from '../../icons'

const Button = styled.button`
  appearance: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #1f1f1f;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.15s,
    transform 0.15s;

  &:hover {
    background: #2a2a2a;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`

type Props = {
  onClick: () => void
}

export const PanelButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick} title='Open Pathfinder'>
      <GearsIcon size={20} fill='#6699cc' />
    </Button>
  )
}

export default PanelButton
