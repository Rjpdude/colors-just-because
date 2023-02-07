import { hcl, piecewise, quantize, RGBColor } from 'd3'
import * as d3 from 'd3'

export interface ColorStream {
  id: string
  colors: UIColor[]
}

export interface UIColor {
  id: string
  rgbstr: string
  rgb: RGBColor
}

export const sortedColorsFromRgbArr = (rgbArr: string[]) => {
  const hclArr = () => rgbArr.map((color) => hcl(color))
  return {
    hueSort: hclArr()
      .sort((a, b) => a.h - b.h)
      .reverse(),
    chromaSort: hclArr()
      .sort((a, b) => a.c - b.c)
      .reverse(),
    lightSort: hclArr()
      .sort((a, b) => a.l - b.l)
      .reverse()
  }
}

export const createColorStreamIO = (
  hexOrRgbArr: string[],
  rows: number,
  cols: number
): string[][] => {
  const { hueSort, chromaSort, lightSort } = sortedColorsFromRgbArr(hexOrRgbArr)

  const sortedByChroma = piecewise(d3.interpolateLab, chromaSort)
  const sortedByHue = piecewise(d3.interpolateLab, hueSort)
  const sortedByLight = piecewise(d3.interpolateLab, lightSort)

  const matrixQuantize = quantize((n) => n, rows + cols)
  const rowInterpolator = (row: number) =>
    piecewise(d3.interpolateLab, [
      sortedByChroma(matrixQuantize[row]),
      sortedByHue(matrixQuantize[row]),
      sortedByLight(matrixQuantize[row])
    ])

  return Array.from({ length: rows }, (_, rowIndx) => {
    const interpolate = rowInterpolator(rowIndx)
    return Array.from({ length: cols }, (_, colIndex) =>
      interpolate(matrixQuantize[rowIndx + colIndex])
    )
  })
}
