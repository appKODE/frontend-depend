import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies

import { Meta, Story } from '@storybook/react'

import { UploadSpec } from './upload-spec'

export default {
  title: 'UI/molecules/UploadSpec',
  component: UploadSpec,
  args: {
    onLoad: () => null,
  },
} as Meta

export const UploadSpecStory: Story<
  React.ComponentProps<typeof UploadSpec>
> = args => <UploadSpec {...args} />
