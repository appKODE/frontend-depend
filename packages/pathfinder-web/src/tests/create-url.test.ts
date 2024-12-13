import { createUrl } from '../features/web-core'
import {
  parsedUrl,
  parsedUrl2,
  parsedUrl3,
  parsedUrlWithoutDomain,
  url,
  url2,
  url3,
} from './mocks'

describe('parseUrl test', () => {
  it('should return correct result 1', () => {
    const result = createUrl(parsedUrl)
    expect(result).toEqual(url)
  })
  it('should return correct result 2', () => {
    const result = createUrl(parsedUrl2)
    expect(result).toEqual(url2)
  })

  it('should return correct result 3', () => {
    const result = createUrl(parsedUrl3)
    expect(result).toEqual(url3)
  })

  it('should return null', () => {
    const result = createUrl(parsedUrlWithoutDomain)
    expect(result).toEqual(null)
  })
})
