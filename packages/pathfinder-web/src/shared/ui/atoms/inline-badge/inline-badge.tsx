import React from 'react'
import styled from 'styled-components'

type Props = {
  count?: number
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 20px;
  min-width: 20px;
  height: 20px;
  width: 20px;
  background: ${({ theme }) => theme.colors.digital.blue.normal};
  border-radius: 50%;
  flex-shrink: 0;
`

const Count = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.panel.bg};
`

export const InlineBadge = ({ count }: Props) => {
  return <Wrapper>{count && <Count>{count}</Count>}</Wrapper>
}
