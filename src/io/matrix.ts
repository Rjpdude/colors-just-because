import { Fabric } from 'fabric/types'
import { WindowDimensions } from 'queue/window'
import { v4 as uuid } from 'uuid'

export const generateMatrix = (dimensions: WindowDimensions) => {
  const div = Math.PI
  const mult = 1

  const columns = Math.floor((Math.sqrt(dimensions.width) / div) * mult)
  const rows = Math.floor((Math.sqrt(dimensions.height) / div) * mult)
  return Array.from({ length: rows }, () => ({
    id: uuid(),
    columns: Array.from({ length: columns }, () => ({
      id: uuid(),
      rgbStr: ''
    }))
  })) as Fabric[]
}
