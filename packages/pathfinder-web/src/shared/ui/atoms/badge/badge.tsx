import React from 'react'
import styled from 'styled-components'

type Props = {
  count?: number
}

const Wrapper = styled.div`
  min-height: 8px;
  min-width: 8px;
  background: ${({ theme }) => theme.colors.digital.green.normal};
  position: absolute;
  top: -3px;
  left: -3px;
  border-radius: 50%;
`

const Count = styled.div`
  padding: 8px;
`

export const Badge = ({ count }: Props) => {
  return <Wrapper>{count && <Count>{count}</Count>}</Wrapper>
}
