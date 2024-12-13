import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies

import { Meta, Story } from '@storybook/react'

import { Header } from './header'

export default {
  title: 'UI/molecules/Header',
  component: Header,
  args: {
    onClick: () => null,
  },
} as Meta

export const HeaderStory: Story<React.ComponentProps<typeof Header>> = args => (
  <Header {...args}>Children</Header>
)
