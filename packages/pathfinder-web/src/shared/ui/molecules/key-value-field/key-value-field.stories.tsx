import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies

import { Meta, Story } from '@storybook/react'

import { KeyValueField } from './key-value-field'

export default {
  title: 'UI/molecules/KeyValueField',
  component: KeyValueField,
  args: {
    title: 'title',
    initialValue: 'itniValue',
    placeholder: 'placeholder',
    onApply: () => null,
  },
} as Meta

export const KeyValueFieldStory: Story<
  React.ComponentProps<typeof KeyValueField>
> = args => <KeyValueField {...args} />
