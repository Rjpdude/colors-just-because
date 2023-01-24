export interface Identified {
  id: string
}

export type Identifiable<T> = T & Identified
