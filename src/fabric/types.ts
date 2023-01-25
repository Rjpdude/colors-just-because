import { Identified } from 'types'

export interface Fabric extends Identified {
  columns: FabricColumn[]
}

export interface FabricColumn extends Identified {
  rgbStr: string
}
