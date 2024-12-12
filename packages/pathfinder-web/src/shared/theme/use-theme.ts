import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { Theme } from './theme'

export const useTheme = () => {
  const theme: Theme = useContext(ThemeContext)

  return theme
}
