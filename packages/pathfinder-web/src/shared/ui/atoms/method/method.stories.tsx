import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react'
import { Method } from './method'

export default {
  title: 'UI/atoms/Method',
  component: Method,
  args: {
    method: 'POST',
  },
} as Meta

export const MethodStory: Story<React.ComponentProps<typeof Method>> = args => (
  <Method {...args} />
)
