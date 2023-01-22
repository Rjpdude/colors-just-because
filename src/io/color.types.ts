import type { RGBColor } from 'd3'
import { IdentifiableElement } from 'registry/registry.types'

export interface ColorStream extends IdentifiableElement {
  colors: UIColor[]
}

export interface UIColor extends IdentifiableElement {
  rgbstr: string
  rgb: RGBColor
}

export interface AsymetricDistribution {
  fibonacci: number
  circumferance: number
}
