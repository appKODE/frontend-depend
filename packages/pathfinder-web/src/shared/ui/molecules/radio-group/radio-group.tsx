import React from 'react'
import styled from 'styled-components'

import { RadioInput } from '../../atoms'
import { TDigitalColors, TRadioOptions } from '../../atoms/radio-input/types'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 26px;
`

type TRadiogroupProps = {
  id: string
  items: TRadioOptions[]
  onChange: (id: string, value: string) => void
  value?: string
  color?: TDigitalColors
}

export const RadioGroup = ({
  id,
  items,
  value,
  color,
  onChange,
}: TRadiogroupProps) => (
  <Wrapper>
    {items.map((item, index) => (
      <RadioInput
        key={index}
        id={id}
        value={item.value}
        label={item.label}
        color={color}
        isChecked={item.value === value}
        onChange={() => onChange(id, item.value)}
      />
    ))}
  </Wrapper>
)
