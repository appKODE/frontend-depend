import React from 'react'
import styled from 'styled-components'

type TOption = {
  label: string
  value: string
  description?: string
}

type Props = {
  id: string
  value: string
  options: TOption[]
  onChange: (id: string, value: string) => void
}

const Select = styled.select<{ $isActive: boolean }>`
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid
    ${({ theme, $isActive }) =>
      $isActive ? '#f5a623' : theme.colors.panel.border};
  background: ${({ theme }) => theme.colors.panel.bg};
  color: ${({ theme, $isActive }) =>
    $isActive ? '#f5a623' : theme.colors.panel.text};
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.panel.accent};
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Description = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.panel.textMuted};
  font-family: monospace;
  margin-top: 2px;
`

export const EnvSelect = ({ id, value, options, onChange }: Props) => {
  const selectedOption = options.find(opt => opt.value === value)

  return (
    <Container>
      <Select
        $isActive={value !== ''}
        value={value}
        onChange={e => onChange(id, e.target.value)}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
      {selectedOption?.description && (
        <Description>{selectedOption.description}</Description>
      )}
    </Container>
  )
}
