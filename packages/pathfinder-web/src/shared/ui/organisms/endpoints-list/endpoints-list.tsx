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

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.panel.border};
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.panel.surface};
  }
`

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
`

const MethodCell = styled.div`
  flex-shrink: 0;
  padding-top: 2px;
`

const PathCell = styled.div`
  flex: 1;
  min-width: 0;
`

const PathTemplate = styled.span`
  display: block;
  font-family: monospace;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.panel.text};
  word-break: break-all;
`

const PathName = styled.span`
  display: block;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.panel.textMuted};
  margin-top: 2px;
`

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
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
      <List>
        {items.map(item => (
          <Row key={item.id}>
            <TopRow>
              <MethodCell>
                <Method method={item.method} />
              </MethodCell>
              <PathCell>
                <PathTemplate>{item.template}</PathTemplate>
                {item.name && <PathName>{item.name}</PathName>}
              </PathCell>
            </TopRow>
            <ActionsRow>
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
              <RadioGroup
                compact
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
            </ActionsRow>
          </Row>
        ))}
      </List>
    </ScrollWrapper>
  )
}
