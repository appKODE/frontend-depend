import React, { ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
  width: 100%;
  flex: 1;
  min-height: 0;
  padding: 8px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.decorative.medium.translucent}
    transparent;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.colors.decorative.medium.translucent};
    border-radius: 4px;
  }
`

type Props = {
  children: ReactNode
}

export const ScrollWrapper = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>
}
