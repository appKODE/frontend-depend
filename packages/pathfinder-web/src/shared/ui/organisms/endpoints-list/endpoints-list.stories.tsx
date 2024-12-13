import React, { ComponentProps } from 'react'
import { Meta, Story } from '@storybook/react'

import { EndpointsList } from './endpoints-list'

type Props = ComponentProps<typeof EndpointsList>
type PartialProps = Partial<Props>

const args: PartialProps = {
  environments: [
    {
      label: 'label',
      value: '1',
    },
  ],
  initialValues: {
    '1': '',
  },
  items: [
    {
      id: '1',
      method: 'POST',
      name: 'Endpoint name',
      template: '/user',
      responses: {
        code: '200',
        examples: [],
      },
    },
    {
      id: '2',
      method: 'POST',
      name: 'Endpoint name',
      template: '/user',
      responses: {
        code: '200',
        examples: [],
      },
    },
  ],
}

export default {
  title: 'UI/organisms/EndpointsList',
  component: EndpointsList,
  args: args,
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as Meta

export const EndpointsListStory: Story<
  React.ComponentProps<typeof EndpointsList>
> = args => <EndpointsList {...args} headers={{ '0': 'POST', '1': 'GET' }} />
