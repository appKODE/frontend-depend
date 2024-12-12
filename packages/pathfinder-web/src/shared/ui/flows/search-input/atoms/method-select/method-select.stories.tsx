import { ComponentProps } from 'react'

import { MethodSelect } from './method-select'

type Props = Partial<ComponentProps<typeof MethodSelect>>

const args: Props = {
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
}

export default {
  title: 'ui/flows/search-input/atoms/MethodSelect',
  component: MethodSelect,
  argTypes: {},
  args,
}

export const Basic = MethodSelect
