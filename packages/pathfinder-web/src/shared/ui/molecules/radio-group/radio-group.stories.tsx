import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies

import { Meta, Story } from '@storybook/react'

import { RadioGroup } from './radio-group'

export default {
  title: 'UI/molecules/RadioGroup',
  component: RadioGroup,
  args: {
    id: 1,
    items: [
      { label: 'label', value: 'value' },
      { label: 'label', value: 'value' },
      { label: 'label', value: 'value' },
    ],
    onChange: () => null,
    value: '',
    color: 'red',
  },
} as Meta

export const RadioGroupStory: Story<
  React.ComponentProps<typeof RadioGroup>
> = args => <RadioGroup {...args} />
