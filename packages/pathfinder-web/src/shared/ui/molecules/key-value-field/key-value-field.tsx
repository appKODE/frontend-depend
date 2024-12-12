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

const Wrapper = styled.div`
  position: relative;
`
const DropArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 8px;
  box-shadow: 3px 3px 5px rgb(0 0 0 / 21%);
  background-color: rgb(255 255 255 / 40%);
  border-radius: 4px;
  backdrop-filter: blur(3px);
`

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 300px;
  gap: 10px;
`

const TextArea = styled.textarea`
  min-width: 400px;
  min-height: 300px;
  padding: 8px;
  margin: 10px;
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
      <RadioWrapper>
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
              />
              {response.examples.length > 0 && currCode === preferCode && (
                <>
                  <select
                    id='example'
                    onChange={event => {
                      setValue(headersString(preferCode, event.target.value))
                    }}>
                    <option selected disabled>
                      Выберите ответ
                    </option>
                    {selectOption}
                  </select>
                </>
              )}
            </RadioWrapper>
          )
        })}
      </RadioWrapper>
    )
  }

  return (
    <Wrapper ref={wrapperRef}>
      <Button onClick={() => setIsOpen(true)}>{title}</Button>
      {value && <Badge />}

      {isOpen && (
        <DropArea>
          {responses && renderExamplesBlock(responses)}
          <TextArea
            onChange={(e: any) => {
              setValue(e.target.value)
            }}
            placeholder={placeholder}
            value={value}
          />
          <Box h={8} />
          <Button onClick={onApplyHandler}>Apply</Button>
        </DropArea>
      )}
    </Wrapper>
  )
}
