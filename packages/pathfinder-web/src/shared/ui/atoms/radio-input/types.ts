import { theme } from '../../../../shared/theme'

export type TRadioOptions = {
  label: string
  value: string
  description?: string
}

export type TDigitalColors = keyof typeof theme.colors.digital
