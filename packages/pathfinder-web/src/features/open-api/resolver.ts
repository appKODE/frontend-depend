import { isOpenApiSpec, isOperationType } from './validators'
import { operationMap } from './utils'
import { ParseResult, Server, UrlSpec } from '../../types'
import { mapResponses } from './mappers'

export function parseJSON(json: unknown): ParseResult {
  if (!isOpenApiSpec(json)) {
    throw new Error('parse error')
  }

  const urls: UrlSpec[] = []

  const urlTemplates = Object.keys(json.paths)
  for (const urlTemplate of urlTemplates) {
    const methods = Object.keys(json.paths[urlTemplate]) as Array<
      keyof typeof operationMap
    >

    for (const method of methods) {
      if (isOperationType(method)) {
        const operation = json.paths[urlTemplate][method]!
        const url: UrlSpec = {
          id: operation.operationId,
          name: operation.summary,
          tags: operation.tags || [],
          template: urlTemplate,
          method: operationMap[method],
          responses: mapResponses(operation.responses || {}),
        }
        urls.push(url)
      }
    }
  }

  return {
    id: json.info.title,
    envs: [
      ...json.servers.map((server: Server, index: number) => ({
        id: index.toString(),
        name: server.description || server.url,
        baseUrl: server.url,
        queryParams: {},
      })),
    ],
    urls,
  }
}
