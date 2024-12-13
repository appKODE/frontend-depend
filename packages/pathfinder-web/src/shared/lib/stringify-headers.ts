import { Header } from '../../types'

export const stringifyHeaders = (headers?: Header[]): string => {
  if (!headers) {
    return ''
  }
  return headers.map(h => `${h.key}: ${h.value}`).join('\n')
}
