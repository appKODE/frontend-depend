import { UrlMethod } from '../../../../../types'
import { Path } from '../panel'
import { TConfigs } from '../types'

export const getData = (
  configs: TConfigs[],
): { methods: UrlMethod[]; paths: Path[] } => {
  const methodsSet = new Set<UrlMethod>()
  const paths = configs.map(config => {
    config.config.urlList.forEach(item => methodsSet.add(item.method))
    return {
      specId: config.specId,
      paths: config.config.urlList,
    }
  })
  return {
    methods: Array.from(methodsSet),
    paths,
  }
}

export const filterPath = (
  paths: Path[],
  methods: UrlMethod[],
  pathName: string,
) => {
  const query = pathName.toLowerCase()
  return paths.map(p => ({
    specId: p.specId,
    paths: p.paths.filter(
      path =>
        methods.includes(path.method) &&
        (query === '' ||
          path.template.toLowerCase().includes(query) ||
          path.name.toLowerCase().includes(query)),
    ),
  }))
}
