import { Fabric } from 'fabric/types'
import { WindowDimensions } from 'queue/window'
import { v4 as uuid } from 'uuid'

export const generateMatrix = (
  dimensions: WindowDimensions
) => {
  const columns = Math.floor(Math.sqrt(dimensions.width))
  const rows = Math.floor(Math.sqrt(dimensions.height))

  return Array.from({ length: rows }, () => ({
    id: uuid(),
    columns: Array.from({ length: columns }, () => ({
      id: uuid(),
      blocks: []
    }))
  })) as Fabric[]
}
