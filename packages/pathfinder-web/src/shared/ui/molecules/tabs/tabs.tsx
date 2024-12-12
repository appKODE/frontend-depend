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
`

export const Tabs = ({ tabs, onLoadSpec }: Props) => {
  return (
    <Wrapper>
      {tabs.map((tab, index) => (
        <Tab {...tab} key={index} />
      ))}
      <Tab>
        <UploadSpec onLoad={onLoadSpec} />
      </Tab>
    </Wrapper>
  )
}
