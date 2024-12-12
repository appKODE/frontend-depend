import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Tabs } from './tabs'

export default {
  title: 'UI/atoms/tabs',
  component: Tabs,
  args: {
    tabs: [
      {
        title: 'title',
        isBudge: true,
      },
    ],
  },
} as Meta

export const MethodStory: Story<React.ComponentProps<typeof Tabs>> = args => (
  <Tabs {...args} />
)
