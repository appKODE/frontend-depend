import React from 'react'
import styled from 'styled-components'

import { UrlMethod } from '../../../../../../types'
import { ThinCloseIcon } from '../../../../icons'
import { MethodSelect } from '../../atoms'

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.decorative.light.normal};
  border-radius: 3px;
  padding: 10px;
  margin: 8px;
  align-items: center;
  z-index: 100;
`

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  width: 300px;
  margin-right: 50px;
  height: 25px;
  font-size: 16px;
  user-select: none;
`

const CloseIconWrap = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 10px;
  cursor: pointer;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.main.dark.normal};
  width: 1px;
  height: 100%;
  margin: 0 10px;
  opacity: 0.5;
`

type Props = {
  value: string
  methods: UrlMethod[]
  onClearHandler: () => void
  onSelectMethod: (method: UrlMethod | null) => void
  onHandleChange: (value: string) => void
}

export const SearchInput = ({
  value,
  methods,
  onClearHandler,
  onSelectMethod,
  onHandleChange,
}: Props) => {
  return (
    <Wrapper>
      <MethodSelect methods={methods} onSelectMethod={onSelectMethod} />
      <Divider />
      <StyledInput
        onChange={(e: any) => onHandleChange(e.target.value)}
        value={value || ''}
        placeholder='Search path...'
        autoComplete='off'
      />
      {value && (
        <CloseIconWrap onClick={onClearHandler}>
          <ThinCloseIcon />
        </CloseIconWrap>
      )}
    </Wrapper>
  )
}
