import React from 'react'
import styled from 'styled-components'
import { GLOBAL_ENV_MARKER } from '../../../../constants'

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
  activeBaseUrl?: string
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
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e0e0e0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 4px center;
  background-size: 1.2em 1.2em;
  padding-right: 28px;

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

export const EnvSelect = ({
  id,
  value,
  options,
  onChange,
  activeBaseUrl,
}: Props) => {
  const selectedOption = options.find(opt => opt.value === value)

  return (
    <Container>
      <Select
        $isActive={value !== '' && value !== GLOBAL_ENV_MARKER}
        value={value}
        onChange={e => onChange(id, e.target.value)}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
      {(activeBaseUrl || selectedOption?.description) && (
        <Description>
          {activeBaseUrl || selectedOption?.description}
        </Description>
      )}
    </Container>
  )
}
