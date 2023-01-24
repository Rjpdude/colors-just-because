import { hcl, piecewise, interpolateLab, quantize } from 'd3'

export const createColorStreamIO = (
  hexOrRgbArr: string[],
  rows: number,
  cols: number
) => {
  const hclArr = () => hexOrRgbArr.map((color) => hcl(color))

  const hueSort = hclArr()
    .sort((a, b) => a.h - b.h)
    .reverse()
  const chromaSort = hclArr()
    .sort((a, b) => a.c - b.c)
    .reverse()
  const lightSort = hclArr()
    .sort((a, b) => a.l - b.l)
    .reverse()

  const sortedByChroma = piecewise(interpolateLab, chromaSort)
  const sortedByHue = piecewise(interpolateLab, hueSort)
  const sortedByLight = piecewise(interpolateLab, lightSort)

  const matrixQuantize = quantize((n) => n, rows + cols)
  const rowInterpolator = (row: number) =>
    piecewise(interpolateLab, [
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
