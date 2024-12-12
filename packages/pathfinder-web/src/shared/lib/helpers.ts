import { Header, Spec, StrRecord } from '../../types'
import { TUrlHeaders } from '../ui/organisms/endpoints-list/types'
import { stringifyHeaders } from './stringify-headers'

export const getEndpointsHeaders = (
  getLocalEndpointHeader: (url: string, specId: string) => Header[],
  specs?: Spec[] | null,
) => {
  const endpointsHeaders: StrRecord<TUrlHeaders> = {}

  specs?.forEach(item => {
    const headers = item.urls.reduce(
      (acc, endpoint) => ({
        ...acc,
        [endpoint.id]: stringifyHeaders(
          getLocalEndpointHeader(endpoint.id, item.id),
        ),
      }),
      {},
    )
    endpointsHeaders[item.id] = headers
  })
  return endpointsHeaders
}
