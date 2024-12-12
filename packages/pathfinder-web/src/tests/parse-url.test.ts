import { parseUrl } from '../features/web-core'
import { parsedUrl, url } from './mocks'

describe('parseUrl test', () => {
  it('should return correct result', () => {
    const result = parseUrl(url)
    expect(result).toEqual(parsedUrl)
  })

  it('should return null 1', () => {
    const result = parseUrl('url.dev')
    expect(result).toEqual(null)
  })

  it('should return null 2', () => {
    const result = parseUrl('')
    expect(result).toEqual(null)
  })
})
