import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import { Tab } from '../../atoms/tab/tab'
import { UploadSpec } from '../upload-spec'

type Props = {
  tabs: ComponentProps<typeof Tab>[]
  onLoadSpec: (data: unknown[]) => void
  onRemoveSpec?: (specId: string) => void
  defaultSpecIds?: Set<string>
}

const Wrapper = styled.div`
  display: flex;
  margin: 8px;
  background-color: #f5f5f7;
  border-radius: 8px;
  flex-wrap: wrap;
`

export const Tabs = ({
  tabs,
  onLoadSpec,
  onRemoveSpec,
  defaultSpecIds,
}: Props) => {
  return (
    <Wrapper>
      {tabs.map((tab, index) => {
        const specId = tab.children as string
        const isDefault = defaultSpecIds?.has(specId)
        return (
          <Tab
            {...tab}
            key={index}
            onClose={
              !isDefault && onRemoveSpec
                ? (e: React.MouseEvent) => {
                    e.stopPropagation()
                    onRemoveSpec(specId)
                  }
                : undefined
            }
          />
        )
      })}
      <UploadSpec onLoad={onLoadSpec} />
    </Wrapper>
  )
}
