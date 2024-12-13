import { parseJSON } from './resolver'
import { mockSpec } from './utils'

test('snapshots should match', () => {
  expect(parseJSON(mockSpec)).toMatchSnapshot()
})
