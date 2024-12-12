import { stringifyHeaders } from '../stringify-headers'

describe('stringifyHeaders tests', () => {
  it('should return empty string for array string', () => {
    const res = stringifyHeaders([])
    expect(res).toStrictEqual('')
  })

  it('should return correct string', () => {
    const res = stringifyHeaders([
      {
        key: 'Authorization',
        value: 'Bearer 123456',
      },
      {
        key: 'Prefer',
        value: 'code=200',
      },
    ])
    expect(res).toBe('Authorization: Bearer 123456\nPrefer: code=200')
  })
})
