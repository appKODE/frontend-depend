import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  appearance: none;
  width: 32px;
  height: 32px;
  background-color: transparent;
  border-radius: 8px;
  border-color: #fff5f5;
  transition: 0.2s linear;
  cursor: pointer;

  svg path {
    transition: 0.2s linear;
  }

  &:focus,
  &:hover {
    background-color: #f5f4f4;
  }
`

type Props = {
  onClick: () => void
}

export const PanelButton = ({ onClick }: Props) => {
  return <Button onClick={onClick}>⚙️</Button>
}

export default PanelButton
