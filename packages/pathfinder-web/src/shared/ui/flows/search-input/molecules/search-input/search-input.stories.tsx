import { ComponentProps } from 'react'
import { SearchInput } from './search-input'

type Props = ComponentProps<typeof SearchInput>
type PartialProps = Partial<Props>

const args: PartialProps = {}

export default {
  title: 'ui/flows/search-input/molecules/SearchInput',
  component: SearchInput,
  argTypes: {},
  args,
}

export const Basic = SearchInput
