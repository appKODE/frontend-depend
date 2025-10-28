import React from 'react'
import styled from 'styled-components'

import { UrlMethod } from '../../../../../../types'
import { BoldCloseIcon } from '../../../../icons'
import { MethodSelect } from '../../atoms'

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  height: 48px;
  background-color: ${({}) => '#F5F5F7'};
  border-radius: 8px;
  padding: 0 12px;
  margin: 8px;
  align-items: center;
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
  background-color: #8e8e90;
  width: 1px;
  height: 100%;
  margin: 0 8px;
  opacity: 1;
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
        onChange={e => onHandleChange(e.target.value)}
        value={value || ''}
        placeholder='Search'
        autoComplete='off'
      />
      {value && (
        <CloseIconWrap onClick={onClearHandler}>
          <BoldCloseIcon />
        </CloseIconWrap>
      )}
    </Wrapper>
  )
}
