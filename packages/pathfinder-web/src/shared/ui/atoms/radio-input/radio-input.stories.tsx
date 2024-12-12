import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies

import { Meta, Story } from '@storybook/react'

import { RadioInput } from './radio-input'

export default {
  title: 'UI/atoms/RadioInput',
  component: RadioInput,
  args: {
    onClick: () => null,
  },
} as Meta

export const RadioInputStory: Story<
  React.ComponentProps<typeof RadioInput>
> = args => <RadioInput {...args} />
