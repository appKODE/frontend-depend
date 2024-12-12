// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Story } from '@storybook/react'
import { theme } from '../src/shared/theme'
import { StorybookGlobalStyles } from './storybook-global-styles'

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  backgrounds: {
    default: 'gray',
    values: [
      { name: 'gray', value: '#E1E1E1' },
      { name: 'white', value: '#fff' },
      { name: 'black', value: '#000' },
    ],
  },
}

export const withThemeProvider = (Story: Story) => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
      <StorybookGlobalStyles />
    </ThemeProvider>
  )
}

export const decorators = [withThemeProvider]
