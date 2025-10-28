import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { ArrowDownIcon } from '../../../../icons'
import { Method } from '../../../../atoms'
import { UrlMethod } from '../../../../../../types'

const Wrapper = styled.div`
  position: relative;
  max-width: 100px;
  width: 100%;
  padding: 8px 0;
`

const MethodButton = styled.button`
  background-color: transparent;
  outline: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: none;
  cursor: pointer;
`

const StyledText = styled.p`
  font-family: sans-serif;
  font-size: 16px;
  line-height: 20px;
  padding: 0;
  margin: 0;
  white-space: nowrap;
`

const IconWrap = styled.div<{ isDropped: boolean }>`
  margin-left: 8px;
  ${({ isDropped }) =>
    isDropped &&
    css`
      transform: rotate(180deg);
    `}
  transition: transform 0.3s ease;
`

const DropDown = styled.div`
  position: absolute;
  background-color: #f5f5f7;
  top: 43px;
  border-radius: 0 0 6px 6px;
  left: -12px;
  min-height: 50px;
  width: 124px;
  z-index: 10;
  box-shadow: 0 5px 20px 0 rgba(12, 32, 62, 0.15);
`

const DropDownItem = styled.div`
  height: 40px;
  padding: 0 10px;
  width: 100%;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`

type Props = {
  methods?: UrlMethod[]
  onSelectMethod: (method: UrlMethod | null) => void
}

export const MethodSelect = ({ methods, onSelectMethod }: Props) => {
  const [selectedMethod, setSelectedMethod] = useState<UrlMethod | null>(null)
  const [isDropped, setIsDropped] = useState<boolean>(false)

  const onHandleSelect = (method: UrlMethod | null) => {
    onSelectMethod(method)
    setSelectedMethod(method)
    setIsDropped(false)
  }

  return (
    <Wrapper>
      <MethodButton
        type='button'
        onClick={() => {
          setIsDropped(prevState => !prevState)
        }}>
        <StyledText>{selectedMethod ?? 'All'}</StyledText>
        <IconWrap isDropped={isDropped}>
          <ArrowDownIcon />
        </IconWrap>
      </MethodButton>
      {isDropped && (
        <DropDown>
          <DropDownItem
            onClick={() => {
              onSelectMethod(null)
              setSelectedMethod(null)
              setIsDropped(false)
            }}>
            All
          </DropDownItem>
          {methods &&
            methods.map((method, index) => (
              <DropDownItem onClick={() => onHandleSelect(method)} key={index}>
                <Method method={method} />
              </DropDownItem>
            ))}
        </DropDown>
      )}
    </Wrapper>
  )
}
