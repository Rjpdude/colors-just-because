import type { RGBColor } from 'd3'

export interface ColorStream {
  id: string
  colors: UIColor[]
}

export interface UIColor {
  id: string
  rgbstr: string
  rgb: RGBColor
}

export interface AsymetricDistribution {
  fibonacci: number
  circumferance: number
}
