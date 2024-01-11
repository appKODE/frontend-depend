import { Linter } from 'eslint'

export type TConfigKeys = 'recommended-react' | 'recommended-react-native'

export type TConfig = Record<TConfigKeys, Linter.RulesRecord>
