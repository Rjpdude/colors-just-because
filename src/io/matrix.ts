import { Fabric } from 'fabric/types'
import { WindowDimensions } from 'queue/window'
import { v4 as uuid } from 'uuid'

const gcd = (a, b) => {
  return b == 0 ? a : gcd(b, a % b)
}

export const generateMatrix = (
  dimensions: WindowDimensions
) => {
  //const gcdVal = gcd(dimensions.width, dimensions.height);
  //const div = dimensions.width/gcdVal
  //const mult = dimensions.height/gcdVal

  const div = Math.PI
  const mult = Math.PI

  const columns = Math.floor(
    (Math.sqrt(dimensions.width) / div) * mult
  )
  const rows = Math.floor(
    (Math.sqrt(dimensions.height) / div) * mult
  )
  return Array.from({ length: rows }, () => ({
    id: uuid(),
    columns: Array.from({ length: columns }, () => ({
      id: uuid(),
      blocks: []
    }))
  })) as Fabric[]
}
