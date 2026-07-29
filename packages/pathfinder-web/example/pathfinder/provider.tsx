import * as React from 'react'
import {
  Pathfinder,
  openApiResolver,
  storage,
} from '@kode-frontend/pathfinder-web'
import coreSpec from './core.json'

type Props = {
  children: React.ReactNode
}

export const PathfinderProvider = ({ children }: Props) => {
  return (
    <Pathfinder
      children={<>{children}</>}
      resolver={openApiResolver}
      storage={storage}
      defaultSpecs={[coreSpec]}
      active={process.env.NODE_ENV !== 'production'}
      dataKey={'pathfinder-storage-key'}
    />
  )
}
