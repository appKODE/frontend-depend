import { OperationResponse, Response } from '../../types'

export const mapResponses = (responses: OperationResponse): Response[] => {
  const codes = Object.keys(responses)
  return codes.map(code => ({
    code,
    examples: Object.keys(
      responses[code].content?.['application/json']?.examples || {},
    ),
  }))
}
