import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react'
import { Button } from './button'

export default { title: 'UI/atoms/Button', component: Button } as Meta

export const ButtonStory: Story<React.ComponentProps<typeof Button>> = () => (
  <Button>Text</Button>
)
