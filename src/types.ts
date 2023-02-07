export interface Identified {
  id: string
}

export type Identifiable<T> = T & Identified

export interface Fabric extends Identified {
  columns: FabricColumn[]
}

export interface FabricColumn extends Identified {
  rgbStr: string
}
