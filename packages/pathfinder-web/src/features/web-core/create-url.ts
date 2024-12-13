import { DataUrl } from '../../types'

export type CreateUrlFn = (url: DataUrl) => string | null

/** Собирает url из параметров URL в одну строку */
export const createUrl: CreateUrlFn = url => {
  const result = []

  if (!url.baseUrl) {
    return null
  }

  result.push(url.baseUrl)

  result.push(url.path)

  const query = url.query.toString()
  if (query.length > 0) {
    result.push(`?${query}`)
  }

  if (url.fragment) {
    result.push(`#${url.fragment}`)
  }

  return result.join('')
}
