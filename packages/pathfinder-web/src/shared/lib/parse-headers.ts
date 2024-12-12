import { Header } from '../../types'

export const parseHeaders = (value: string): Header[] => {
  if (!value) {
    return []
  }

  const chunks = value.split('\n')

  const result = chunks.reduce<Header[]>((acc, current) => {
    const res = current.split(':')

    const key = res[0] || ''

    const value = res[1] || ''

    if (key.length > 0 && value.length > 0) {
      return [...acc, { key: key.trim(), value: value.trim() }]
    }

    return acc
  }, [])

  return result
}
