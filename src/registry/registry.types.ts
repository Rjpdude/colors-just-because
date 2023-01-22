export interface Registry {
  documentWidth: number
  documentHeight: number
}

export interface IdentifiableElement {
  id: string
}

export interface Block extends IdentifiableElement {
  coords: number[]
}
