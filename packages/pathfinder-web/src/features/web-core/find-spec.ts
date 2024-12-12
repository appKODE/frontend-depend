import UrlPattern from 'url-pattern'

import { FindSpecFn, UrlSpec } from '../../types'

/**
 *
 * Находит UrlSpec из списка для url и method
 *
 */
export const findSpec: FindSpecFn = (templates, method, url, basePath) => {
  let result: UrlSpec | null = null
  const pathname = url.replace(basePath, '')

  templates.forEach((value, key) => {
    // Убираем из url basePath чтобы получить чистый адресс,
    // необходимо это для обработки кейсов, когда server в стоплайте указан с путем, например https://path.ru/api
    // в таком случае в спеке адреса будут описаны как /adress, а мы будем сравнивать с /api/adress и не сможем их сматчить
    const template = value
      .replace(/{.*}/gm, match => `(/:${match.replace(/(\{|\})/gm, '')})`)
      .replace(/\/\(\//gm, '(/')

    const pattern = new UrlPattern(`${template}(/)(?*)`, {
      segmentNameCharset: 'a-zA-Z0-9_-',
    })

    const res = pattern.match(pathname)

    if (res && key.method === method) {
      result = key
    }
  })

  return result
}
