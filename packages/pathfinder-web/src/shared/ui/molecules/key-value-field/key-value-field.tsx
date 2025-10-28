import React, { useRef, useState } from 'react'
import styled from 'styled-components'

import { useClickOutside } from '../../../hooks'
import { Button, Box, Badge } from '../../atoms'
import { RadioGroup } from '../radio-group'

type TResponse = {
  code: string
  examples: string[]
}

type Props = {
  title: string
  id: string
  responses?: TResponse[]
  placeholder?: string
  initialValue: string
  onApply: (value: string) => void
}

const BackGround = styled.div<{ isVisible: boolean }>`
  position: fixed;
  height: 100dvh;
  width: 100dvw;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: #1c1c1e;
  opacity: 0.7;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
`

const Wrapper = styled.div`
  position: relative;
`
const DropArea = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100;
  padding: 16px;
  box-shadow: 3px 3px 5px rgb(0 0 0 / 21%);
  background-color: rgb(255 255 255);
  transform: translate(-50%, -50%);
  max-width: 80dvw;
  max-height: 80dvh;
  min-height: 40dvh;
  min-width: 40dvh;
  overflow: auto;
  border-radius: 16px;
`

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
  margin: 8px 0px;
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  min-width: 200px;
  margin: 8px 0;
  padding: 8px;
`

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  button {
    min-width: 100px;
  }
`

const headersString = (value: string, example?: string) =>
  `Prefer: code=${value} ${example ? `, example=${example}` : ''}`

export const KeyValueField = ({
  initialValue,
  responses,
  id,
  title,
  placeholder,
  onApply,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(initialValue)
  const [currCode, setCurrCode] = useState<string | undefined>(undefined)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const handleCloseMenu = () => setIsOpen(false)

  useClickOutside({
    ref: wrapperRef,
    handler: handleCloseMenu,
    flag: isOpen,
  })

  const onApplyHandler = () => {
    onApply(value)
    setIsOpen(false)
  }
  const renderExamplesBlock = (responses: TResponse[]) => {
    return (
      <>
        {responses.map(response => {
          const selectOption = response.examples.map(item => (
            <option value={item}>{item}</option>
          ))
          const preferCode = response.code
          return (
            <RadioWrapper key={id}>
              <RadioGroup
                id='code'
                items={[{ value: preferCode, label: preferCode }]}
                onChange={(_, value) => {
                  setValue(headersString(value))
                  setCurrCode(preferCode)
                }}
                value={currCode}
                slot={
                  response.examples.length > 0 &&
                  currCode === preferCode && (
                    <>
                      <select
                        id='example'
                        onChange={event => {
                          setValue(
                            headersString(preferCode, event.target.value),
                          )
                        }}>
                        <option selected disabled>
                          Выберите ответ
                        </option>
                        {selectOption}
                      </select>
                    </>
                  )
                }
              />
            </RadioWrapper>
          )
        })}
      </>
    )
  }

  return (
    <Wrapper ref={wrapperRef}>
      <BackGround isVisible={isOpen} onClick={handleCloseMenu} />
      <Button onClick={() => setIsOpen(true)}>{title}</Button>
      {value && <Badge />}

      {isOpen && (
        <DropArea>
          <div style={{ fontSize: '20px' }}>Headers definition</div>
          {responses && renderExamplesBlock(responses)}
          <TextArea
            onChange={e => {
              setValue(e.target.value)
            }}
            placeholder={placeholder}
            value={value}
          />
          <Box h={8} />
          <ButtonWrapper>
            <Button onClick={onApplyHandler}>Apply</Button>
          </ButtonWrapper>
        </DropArea>
      )}
    </Wrapper>
  )
}
