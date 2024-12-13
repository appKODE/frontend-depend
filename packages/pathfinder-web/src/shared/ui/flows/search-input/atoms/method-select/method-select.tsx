import React, { useState } from 'react'
import styled from 'styled-components'

import { ArrowDownIcon } from '../../../../icons'
import { Method } from '../../../../atoms'
import { UrlMethod } from '../../../../../../types'

const Wrapper = styled.div`
  position: relative;
  width: 150px;
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
`

const DropDown = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.decorative.light.normal};
  top: 38px;
  border-radius: 0 0 3px 3px;
  left: -10px;
  min-height: 50px;
  width: 170px;
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
        <StyledText>{selectedMethod ?? 'All methods'}</StyledText>
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
            All methods
          </DropDownItem>
          {methods &&
            [...methods].map((method, index) => (
              <DropDownItem onClick={() => onHandleSelect(method)} key={index}>
                <Method method={method} />
              </DropDownItem>
            ))}
        </DropDown>
      )}
    </Wrapper>
  )
}
