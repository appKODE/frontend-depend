import React from 'react'
import styled from 'styled-components'

type Props = {
  count?: number
}

const Wrapper = styled.div`
  min-height: 4px;
  min-width: 4px;
  background: #90caf9;
  border-radius: 8px;
  flex: 1;
`

const Count = styled.div`
  padding: 2px;
  font-size: 12px;
`

export const InlineBadge = ({ count }: Props) => {
  return <Wrapper>{count && <Count>{count}</Count>}</Wrapper>
}
