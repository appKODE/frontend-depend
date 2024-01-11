import { Linter } from 'eslint'
import { configRules } from '../rules'

export default {
  rules: configRules['recommended-react'],
  plugins: [],
} satisfies Linter.Config
