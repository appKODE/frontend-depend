import React, { useRef, useState } from 'react'
import styled from 'styled-components'

import { useClickOutside } from '../../../hooks'
import { Button, Box } from '../../atoms'

type TResponse = {
  code: string
  examples: string[]
}

type THeader = {
  key: string
  value: string
}

type Props = {
  title: string
  id: string
  responses?: TResponse[]
  placeholder?: string
  initialValue: string
  onApply: (value: string) => void
}

const parseHeadersString = (str?: string): THeader[] => {
  if (!str || !str.trim()) return []
  return str
    .split('\n')
    .map(line => {
      const idx = line.indexOf(': ')
      if (idx === -1) return null
      return {
        key: line.slice(0, idx).trim(),
        value: line.slice(idx + 2).trim(),
      }
    })
    .filter((h): h is THeader => h !== null && h.key !== '')
}

const serializeHeaders = (headers: THeader[]): string =>
  headers
    .filter(h => h.key.trim() !== '')
    .map(h => `${h.key}: ${h.value}`)
    .join('\n')

const BackGround = styled.div<{ isVisible: boolean }>`
  position: fixed;
  height: 100dvh;
  width: 100dvw;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
`

const DropArea = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100;
  padding: 16px;
  box-shadow: 3px 3px 5px rgb(0 0 0 / 21%);
  background-color: ${({ theme }) => theme.colors.panel.bg};
  color: ${({ theme }) => theme.colors.panel.text};
  transform: translate(-50%, -50%);
  max-width: 80dvw;
  max-height: 80dvh;
  min-width: 360px;
  overflow: auto;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.panel.border};
`

const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.panel.text};
`

const HeaderRow = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-bottom: 6px;
`

const KeyInput = styled.input`
  flex: 1;
  padding: 5px 8px;
  border: 1px solid ${({ theme }) => theme.colors.panel.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.panel.surface};
  color: ${({ theme }) => theme.colors.panel.text};
  font-size: 12px;
  font-family: monospace;
  outline: none;
`

const ValueInput = styled(KeyInput)`
  flex: 2;
`

const DeleteBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.panel.textMuted};
  font-size: 14px;
  padding: 2px 4px;
  border-radius: 4px;
  &:hover {
    color: ${({ theme }) => theme.colors.panel.text};
  }
`

const AddBtn = styled.button`
  background: none;
  border: 1px dashed ${({ theme }) => theme.colors.panel.border};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.panel.textMuted};
  font-size: 12px;
  padding: 5px 12px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 12px;
  &:hover {
    color: ${({ theme }) => theme.colors.panel.text};
  }
`

const QuickFillSection = styled.div`
  margin-bottom: 12px;
`

const QuickFillLabel = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.panel.textMuted};
  margin-bottom: 6px;
`

const QuickFillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
`

const QuickFillBtn = styled.button<{ $active?: boolean }>`
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid
    ${({ theme, $active }) =>
      $active
        ? (theme.colors.panel.accent ?? '#4f8ef7')
        : theme.colors.panel.border};
  background: ${({ theme, $active }) =>
    $active ? (theme.colors.panel.accent ?? '#4f8ef7') : 'none'};
  color: ${({ theme, $active }) =>
    $active ? '#fff' : theme.colors.panel.text};
  font-size: 11px;
  cursor: pointer;
`

const ExampleSelect = styled.select`
  font-size: 11px;
  padding: 3px 6px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.panel.border};
  background: ${({ theme }) => theme.colors.panel.bg};
  color: ${({ theme }) => theme.colors.panel.text};
`

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  button {
    min-width: 100px;
  }
`

const CountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.digital?.green ?? '#22c55e'};
  color: #fff;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  min-width: 18px;
`

export const KeyValueField = ({
  initialValue,
  responses,
  id,
  title,
  onApply,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [headers, setHeaders] = useState<THeader[]>(() =>
    parseHeadersString(initialValue),
  )
  const [currCode, setCurrCode] = useState<string | undefined>(undefined)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const handleCloseMenu = () => setIsOpen(false)

  useClickOutside({
    ref: wrapperRef,
    handler: handleCloseMenu,
    flag: isOpen,
  })

  const handleOpen = () => {
    setHeaders(parseHeadersString(initialValue))
    setCurrCode(undefined)
    setIsOpen(true)
  }

  const updateHeader = (index: number, field: 'key' | 'value', val: string) => {
    setHeaders(prev =>
      prev.map((h, i) => (i === index ? { ...h, [field]: val } : h)),
    )
  }

  const removeHeader = (index: number) => {
    setHeaders(prev => prev.filter((_, i) => i !== index))
  }

  const addHeader = () => {
    setHeaders(prev => [...prev, { key: '', value: '' }])
  }

  const setPreferHeader = (code: string, example?: string) => {
    const preferValue = example
      ? `code=${code}, example=${example}`
      : `code=${code}`
    setHeaders(prev => {
      const idx = prev.findIndex(h => h.key.toLowerCase() === 'prefer')
      if (idx !== -1) {
        return prev.map((h, i) =>
          i === idx ? { ...h, value: preferValue } : h,
        )
      }
      return [...prev, { key: 'Prefer', value: preferValue }]
    })
  }

  const onApplyHandler = () => {
    onApply(serializeHeaders(headers))
    setIsOpen(false)
  }

  const activeCount = headers.filter(h => h.key.trim() !== '').length

  return (
    <Wrapper ref={wrapperRef}>
      <BackGround isVisible={isOpen} onClick={handleCloseMenu} />
      <Button onClick={handleOpen}>{title}</Button>

      {isOpen && (
        <DropArea>
          <ModalTitle>Headers</ModalTitle>

          {headers.map((h, i) => (
            <HeaderRow key={i}>
              <KeyInput
                placeholder='Header name'
                value={h.key}
                onChange={e => updateHeader(i, 'key', e.target.value)}
              />
              <ValueInput
                placeholder='Value'
                value={h.value}
                onChange={e => updateHeader(i, 'value', e.target.value)}
              />
              <DeleteBtn onClick={() => removeHeader(i)}>x</DeleteBtn>
            </HeaderRow>
          ))}

          <AddBtn onClick={addHeader}>+ Add header</AddBtn>

          {responses && responses.length > 0 && (
            <QuickFillSection>
              <QuickFillLabel>Quick fill (Prefer):</QuickFillLabel>
              <QuickFillRow>
                {responses.map(response => (
                  <React.Fragment key={response.code}>
                    <QuickFillBtn
                      $active={currCode === response.code}
                      onClick={() => {
                        setCurrCode(response.code)
                        setPreferHeader(response.code)
                      }}>
                      {response.code}
                    </QuickFillBtn>
                    {currCode === response.code &&
                      response.examples.length > 0 && (
                        <ExampleSelect
                          defaultValue=''
                          onChange={e => {
                            if (e.target.value)
                              setPreferHeader(response.code, e.target.value)
                          }}>
                          <option value='' disabled>
                            example
                          </option>
                          {response.examples.map(ex => (
                            <option key={ex} value={ex}>
                              {ex}
                            </option>
                          ))}
                        </ExampleSelect>
                      )}
                  </React.Fragment>
                ))}
              </QuickFillRow>
            </QuickFillSection>
          )}

          <Box h={8} />
          <ButtonWrapper>
            <Button onClick={onApplyHandler}>Apply</Button>
          </ButtonWrapper>
        </DropArea>
      )}
    </Wrapper>
  )
}
