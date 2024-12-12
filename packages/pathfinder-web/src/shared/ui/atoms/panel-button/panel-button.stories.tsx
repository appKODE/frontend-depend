import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react'

import { PanelButton } from './panel-button'

export default {
  title: 'UI/atoms/PanelButton',
  component: PanelButton,
  args: {
    onClick: () => null,
  },
} as Meta

export const PanelButtonStory: Story<
  React.ComponentProps<typeof PanelButton>
> = args => <PanelButton {...args} />
