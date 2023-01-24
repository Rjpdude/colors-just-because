import { v4 as uuid } from 'uuid'
import { Queue } from './delta'

export const QUEUE_TIME = 500

export const schedulerDefault: Queue = {
  dimensions: []
}

export const generateMatrix = (dimensions: number[]) => {
  const [columns, rows] = dimensions.map((num) =>
    Math.floor(Math.sqrt(num) * 2)
  )
  return Array.from({ length: rows }, () => ({
    id: uuid(),
    columns: Array.from({ length: columns }, () => ({
      id: uuid(),
      blocks: []
    }))
  }))
}

export const mapColorScheme = (_dimensions: number[]) => {
  return []
}
