import { Fabric } from 'fabric/types'
import { v4 as uuid } from 'uuid'
import { Queue } from './delta'

export const QUEUE_TIME = 200

export const schedulerDefault: Queue = {
  dimensions: []
}

export const generateMatrix = (dimensions: number[]) => {
  const [columns, rows] = dimensions.map((num) =>
    Math.floor(Math.sqrt(num))
  )
  return Array.from({ length: rows }, () => ({
    id: uuid(),
    columns: Array.from({ length: columns }, () => ({
      id: uuid(),
      blocks: []
    }))
  })) as Fabric[]
}

export const mapColorScheme = (_dimensions: number[]) => {
  return []
}
