import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Tab } from './tab'

export default {
  title: 'UI/atoms/tab',
  component: Tab,
  args: {
    title: 'title',
    isBudge: true,
  },
} as Meta

export const MethodStory: Story<React.ComponentProps<typeof Tab>> = args => (
  <>
    <Tab {...args} />
    <Tab {...args} />
  </>
)
