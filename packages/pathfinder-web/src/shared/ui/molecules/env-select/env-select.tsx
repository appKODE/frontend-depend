import React from 'react'
import styled from 'styled-components'

type TOption = {
  label: string
  value: string
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

export const EnvSelect = ({ id, value, options, onChange }: Props) => (
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
)
