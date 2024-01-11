import { Linter } from 'eslint'
import { configRules } from '../rules'

export default {
  rules: configRules['recommended-react-native'],
  plugins: [],
} satisfies Linter.Config
