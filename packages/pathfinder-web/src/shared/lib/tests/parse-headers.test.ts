import { parseHeaders } from '../parse-headers'

describe('parseHeaders tests', () => {
  it('should return empty array for empty string', () => {
    const res = parseHeaders('')
    expect(res).toStrictEqual([])
  })

  it('should return empty array for incorrect string', () => {
    const res = parseHeaders('Authorization:')
    expect(res).toStrictEqual([])
  })

  it('should return correct, trimmed result for one header', () => {
    const res = parseHeaders('Authorization: Bearer 123456 ')
    expect(res).toStrictEqual([
      {
        key: 'Authorization',
        value: 'Bearer 123456',
      },
    ])
  })

  it('should return correct, trimmed result for several headers', () => {
    const res = parseHeaders('Authorization: Bearer 123456 \n Prefer: code=200')
    expect(res).toStrictEqual([
      {
        key: 'Authorization',
        value: 'Bearer 123456',
      },
      {
        key: 'Prefer',
        value: 'code=200',
      },
    ])
  })
})
