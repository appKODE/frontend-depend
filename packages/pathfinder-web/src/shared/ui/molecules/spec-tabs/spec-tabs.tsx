import React from 'react'
import styled from 'styled-components'
import { Tab } from '../../atoms/tab/tab'

type Props = {
  activeTab: 'overrides' | 'preview'
  onTabChange: (tab: 'overrides' | 'preview') => void
}

const Wrapper = styled.div`
  display: flex;
  margin: 8px 8px 0px 8px;
  background-color: ${({ theme }) => theme.colors.panel.surface};
  border-radius: 6px;
  gap: 2px;
  padding: 2px;
`

export const SpecTabs = ({ activeTab, onTabChange }: Props) => {
  return (
    <Wrapper>
      <Tab
        isSelected={activeTab === 'overrides'}
        onClick={() => onTabChange('overrides')}>
        Overrides
      </Tab>
      <Tab
        isSelected={activeTab === 'preview'}
        onClick={() => onTabChange('preview')}>
        Preview
      </Tab>
    </Wrapper>
  )
}
