import React from 'react'
import { Meta, Story } from '@storybook/react'
import { InlineBadge } from './inline-badge'

export default {
  title: 'UI/atoms/InlineBadge',
  component: InlineBadge,
  args: {},
} as Meta

export const MethodStory: Story = () => <InlineBadge />
