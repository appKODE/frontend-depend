import styledComponents, { ThemedBaseStyledInterface } from 'styled-components'

import { Theme } from './theme'

export { theme } from './theme'
export { useTheme } from './use-theme'

export const styled: ThemedBaseStyledInterface<Theme> = styledComponents
