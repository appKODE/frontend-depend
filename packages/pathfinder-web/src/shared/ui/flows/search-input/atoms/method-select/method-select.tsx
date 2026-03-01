import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components'

import { ArrowDownIcon } from '../../../../icons'
import { Method } from '../../../../atoms'
import { UrlMethod } from '../../../../../../types'
import { useClickOutside } from '../../../../../hooks'

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
  color: ${({ theme }) => theme.colors.panel.text};
`

const IconWrap = styled.div<{ isDropped: boolean }>`
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.panel.text};
  ${({ isDropped }) =>
    isDropped &&
    css`
      transform: rotate(180deg);
    `}
  transition: transform 0.3s ease;
`

const DropDown = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.panel.surface};
  top: 43px;
  border-radius: 0 0 6px 6px;
  left: -12px;
  min-height: 50px;
  width: 124px;
  z-index: 10;
  box-shadow: 0 5px 20px 0 rgba(12, 32, 62, 0.15);
  border: 1px solid ${({ theme }) => theme.colors.panel.border};
  border-top: none;
`

const DropDownItem = styled.div<{ $active?: boolean }>`
  height: 40px;
  padding: 0 10px;
  width: 100%;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  cursor: pointer;
  background-color: ${({ theme, $active }) =>
    $active ? (theme.colors.panel.accent ?? '#4f8ef7') : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? '#fff' : theme.colors.panel.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.panel.bg};
  }
`

type Props = {
  methods?: UrlMethod[]
  value: UrlMethod | null
  onSelectMethod: (method: UrlMethod | null) => void
}

export const MethodSelect = ({ methods, value, onSelectMethod }: Props) => {
  const [isDropped, setIsDropped] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useClickOutside({
    ref: wrapperRef,
    handler: () => setIsDropped(false),
    flag: isDropped,
  })

  const onHandleSelect = (method: UrlMethod | null) => {
    onSelectMethod(method)
    setIsDropped(false)
  }

  return (
    <Wrapper ref={wrapperRef}>
      <MethodButton
        type='button'
        onClick={() => {
          setIsDropped(prevState => !prevState)
        }}>
        {value ? <Method method={value} /> : <StyledText>All</StyledText>}
        <IconWrap isDropped={isDropped}>
          <ArrowDownIcon color='currentColor' />
        </IconWrap>
      </MethodButton>
      {isDropped && (
        <DropDown>
          <DropDownItem
            $active={value === null}
            onClick={() => onHandleSelect(null)}>
            All
          </DropDownItem>
          {methods &&
            methods.map(method => (
              <DropDownItem
                $active={value === method}
                onClick={() => onHandleSelect(method)}
                key={method}>
                <Method method={method} />
              </DropDownItem>
            ))}
        </DropDown>
      )}
    </Wrapper>
  )
}
