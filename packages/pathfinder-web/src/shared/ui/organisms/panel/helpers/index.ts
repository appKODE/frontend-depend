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
  return paths.map(paths => {
    return {
      specId: paths.specId,
      paths: paths.paths.filter(
        path => path.name.includes(pathName) && methods.includes(path.method),
      ),
    }
  })
}
