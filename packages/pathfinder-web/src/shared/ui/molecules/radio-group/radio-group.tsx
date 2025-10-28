import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { RadioInput } from '../../atoms'
import { TDigitalColors, TRadioOptions } from '../../atoms/radio-input/types'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
`

type TRadiogroupProps = {
  id: string
  items: TRadioOptions[]
  slot?: ReactNode
  onChange: (id: string, value: string) => void
  value?: string
  color?: TDigitalColors
}

const Item = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`

export const RadioGroup = ({
  id,
  items,
  value,
  color,
  slot,
  onChange,
}: TRadiogroupProps) => (
  <Wrapper>
    {items.map((item, index) => (
      <Item key={index}>
        <RadioInput
          id={id}
          value={item.value}
          label={item.label}
          color={color}
          isChecked={item.value === value}
          onChange={() => onChange(id, item.value)}
        />
        {slot}
      </Item>
    ))}
  </Wrapper>
)
