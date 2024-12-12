import React from 'react'
import styled, { useTheme } from 'styled-components'

import { UrlMethod } from '../../../../types'

const Wrapper = styled.span<{ $background: string }>`
  font-size: 12px;
  display: inline-block;
  padding: 4px 8px;
  color: ${({ theme }) => theme.colors.main.light.normal};
  border-radius: 4px;
  background-color: ${({ $background }) => $background};
`

type Props = {
  method: UrlMethod
}

export const Method = ({ method }: Props) => {
  const theme = useTheme()

  const methodColors: Record<UrlMethod, string> = {
    GET: theme.colors.digital.green.normal,
    POST: theme.colors.digital.blue.normal,
    DELETE: theme.colors.digital.red.normal,
    PUT: theme.colors.digital.orange.normal,
    PATCH: theme.colors.digital.orange.normal,
    HEAD: theme.colors.digital.violet.normal,
    TRACE: theme.colors.digital.violet.normal,
    CONNECT: theme.colors.digital.violet.normal,
    OPTIONS: theme.colors.digital.violet.normal,
  }

  return <Wrapper $background={methodColors[method]}>{method}</Wrapper>
}
