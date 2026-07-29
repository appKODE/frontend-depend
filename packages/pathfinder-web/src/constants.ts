export const GLOBAL_ENV_MARKER = '__GLOBAL__'

export const isGlobalEnv = (value: string) => value === GLOBAL_ENV_MARKER
export const isNoOverride = (value: string) => value === ''
export const isCustomEnv = (value: string) =>
  !isGlobalEnv(value) && !isNoOverride(value)
