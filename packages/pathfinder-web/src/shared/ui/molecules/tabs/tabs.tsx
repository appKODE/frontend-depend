import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import { Tab } from '../../atoms/tab/tab'
import { UploadSpec } from '../upload-spec'

type Props = {
  tabs: ComponentProps<typeof Tab>[]
  onLoadSpec: (data: unknown[]) => void
}

const Wrapper = styled.div`
  display: flex;
  margin: 8px;
  background-color: #f5f5f7;
  border-radius: 8px;
  flex-wrap: wrap;
`

export const Tabs = ({ tabs, onLoadSpec }: Props) => {
  return (
    <Wrapper>
      {tabs.map((tab, index) => (
        <Tab {...tab} key={index} />
      ))}
      <UploadSpec onLoad={onLoadSpec} />
    </Wrapper>
  )
}
