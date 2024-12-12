import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { TBasePathChangeHandler, TUrlHeaders, TUrlItem } from './types'
import { Method, ScrollWrapper } from '../../atoms'
import { RadioGroup } from '../../molecules'
import { TRadioOptions } from '../../atoms/radio-input/types'
import { KeyValueField } from '../../molecules/key-value-field'

type Props = {
  environments: TRadioOptions[]
  items: TUrlItem[]
  initialValues: Record<string, string>
  headers: TUrlHeaders
  onBasePathChange: TBasePathChangeHandler
  onHeadersChange: (headers: string, endpointId: string) => void
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr {
    transition: 0.2s linear;

    &:hover {
      background: ${({ theme }) => theme.colors.decorative.light.normal};
    }
  }

  tr td {
    padding: 8px;
    border: 1px solid
      ${({ theme }) => theme.colors.decorative.medium.translucent};
  }
`

const EndpointName = styled.span`
  display: block;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.decorative.medium.normal};
`

export const EndpointsList = ({
  environments,
  items,
  initialValues,
  headers,
  onBasePathChange,
  onHeadersChange,
}: Props) => {
  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])
  return (
    <ScrollWrapper>
      <Table>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>
                <Method method={item.method} />
              </td>
              <td>
                {item.template}
                <EndpointName>{item.name}</EndpointName>
              </td>
              <td>
                <KeyValueField
                  title='Headers'
                  id={item.id}
                  placeholder='Enter each header on a new line. &#10;For example:&#10;Authorization: Bearer 123&#10;Prefer: code=200, dynamic=true'
                  onApply={value => {
                    onHeadersChange(value, item.id)
                  }}
                  initialValue={headers[item.id]}
                  responses={item.responses}
                />
              </td>
              <td>
                <RadioGroup
                  id={item.id}
                  value={values[item.id]}
                  onChange={(id, value) => {
                    onBasePathChange(id, value || undefined)
                    setValues(prev => ({ ...prev, [id]: value }))
                  }}
                  items={[
                    ...environments,
                    {
                      label: 'Global',
                      value: '',
                    },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollWrapper>
  )
}
