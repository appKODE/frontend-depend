import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Badge } from './badge'

export default {
  title: 'UI/atoms/Badge',
  component: Badge,
  args: {},
} as Meta

export const MethodStory: Story = () => <Badge />
