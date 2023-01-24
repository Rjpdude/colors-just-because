import { AsymetricDistribution, UIColor } from './color.types'
import * as d3 from 'd3'
import { v4 as uuid } from 'uuid'
import { hcl } from 'd3'

export function fibonacciSeq(
  position = 1,
  current = 1,
  previous = 0,
  accumulation = 0,
  arr: AsymetricDistribution[] = []
): AsymetricDistribution[] {
  const circumferance = parseFloat(
    d3.format('.1f')(0.05 * ((current + position - 1) * 2 + accumulation))
  )
  const nextArr = arr.concat({
    fibonacci: current,
    circumferance
  })
  const nextFibonacci = current + previous
  const nextAccumulation = accumulation + current

  return position === 16
    ? nextArr
    : fibonacciSeq(
        position + 1,
        nextFibonacci,
        current,
        nextAccumulation,
        nextArr
      )
}

export const createColorStreamIO = (
  hexOrRgbArr: string[],
  rows: number,
  cols: number
) => {
  const colorMatrix = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => '#fff')
  )

  const quantizedEnum = d3.quantize((n) => n, rows + 1)
  // const blendedInterp = d3.piecewise(d3.interpolateLab, hexOrRgbArr)
  // const blended = Array.from({ length: rows }, (_val, i) =>
  //   blendedInterp(quantizedEnum[i])
  // )

  const chromaInterp = hexOrRgbArr
    .map((color) => hcl(color))
    .sort((a, b) => a.c - b.c)
  const sortedByChroma = d3.piecewise(d3.interpolateLab, chromaInterp)

  const hueInterp = hexOrRgbArr
    .map((color) => hcl(color))
    .sort((a, b) => a.h - b.h)
  const sortedByHue = d3.piecewise(d3.interpolateLab, hueInterp)

  const lightInterp = hexOrRgbArr
    .map((color) => hcl(color))
    .sort((a, b) => a.l - b.l)
    .reverse()
  const sortedByLight = d3.piecewise(d3.interpolateLab, lightInterp)

  // for (let i = 0; i < rows; i++) {
  //   const quantized = quantizedEnum[i]
  //   // colorMatrix[i][Math.ceil(cols / 2) + 2] = blended[i]
  //   colorMatrix[i][Math.ceil(cols / 2) + 1] = sortedByChroma(quantized)
  //   colorMatrix[i][Math.ceil(cols / 2)] = sortedByHue(quantized)
  //   colorMatrix[i][Math.ceil(cols / 2) - 1] = sortedByLight(quantized)
  // }

  const trifecta = (row: number) =>
    d3.piecewise(d3.interpolateLab, [
      sortedByHue(quantizedEnum[row]),
      sortedByLight(quantizedEnum[row]),
      sortedByChroma(quantizedEnum[row]),
    ])
  const quantizedCol = d3.quantize((n) => n, cols + 1)
  for (let i = 0; i < rows; i++) {
    for (let i2 = 0; i2 < cols; i2++) {
      const interp = trifecta(i)
      colorMatrix[i][i2] = interp(quantizedCol[i2])
    }
  }
  //   colorMatrix[0][i] = trifecta(quantizedCol[i])
  // }
  return colorMatrix
}

export const createColorStream = (
  hexOrRgbArr: string[],
  onStream: (stream: UIColor[]) => void
) => {
  const res: UIColor[][] = []
  const fibonacciArr = fibonacciSeq()

  const interpolateDefinitions = (indx: number, color: string) => {
    const backupHcl = d3.hcl(color)
    const genesisHcl = d3.hcl(backupHcl.h, backupHcl.c, 50)
    const scaled = scaleHcl(indx, genesisHcl, fibonacciArr)

    const test1 = scaled.rowDark.reverse().slice(0, 6)
    const test2 = scaled.rowLight.slice(
      scaled.rowLight.length - 7,
      scaled.rowLight.length - 1
    )
    const selection = d3
      .quantize(d3.interpolateHcl(test1[0], color), 10)
      .slice(0, 9)
      .concat(color)
      .concat(
        d3
          .quantize(d3.interpolateHcl(color, test2[test1.length - 1]), 10)
          .slice(1)
      )
      .map((hcl) => d3.rgb(hcl).toString())
    //return selection
    //console.log('result', selection)
    return selection

    // return scaled.rowDark
    //   .reverse()
    //   .slice(0, scaled.rowDark.length - 1)
    //   .concat(d3.hcl(color))
    //   .concat(scaled.rowLight)
  }

  const scaleHcl = (
    row: number,
    hcl: d3.HCLColor,
    dist: AsymetricDistribution[]
  ) => {
    const rowLight: d3.HCLColor[] = []
    const rowDark: d3.HCLColor[] = []

    for (
      let i = 0, queueLight = hcl.copy(), queueDark = hcl.copy();
      i < dist.length - 1;
      i++
    ) {
      //queueLight.h -= dist[i].circumferance / 20
      //queueLight.c += dist[i].circumferance / 10
      //queueLight.l += dist[i].circumferance / 2

      //queueDark.h += dist[i].circumferance / 20
      //queueDark.c -= dist[i].circumferance / 10
      //queueDark.l -= dist[i].circumferance / 2

      rowLight.push(queueLight)
      rowDark.push(queueDark)

      queueLight = hcl.copy()
      queueDark = hcl.copy()
    }

    return {
      rowLight,
      rowDark
    }
  }

  for (let i = 0; i < hexOrRgbArr.length; i++) {
    const genesis = hexOrRgbArr[i]
    const colorDefinitions = interpolateDefinitions(i, genesis)
    res[i] = colorDefinitions.map((rbgstr) => ({
      id: uuid(),
      rgb: d3.rgb(rbgstr),
      rgbstr: d3.rgb(rbgstr).toString()
    }))
    // onStream(
    //   colorDefinitions.map((rbgstr) => ({
    //     id: uuid(),
    //     rgb: d3.rgb(rbgstr),
    //     rgbstr: d3.rgb(rbgstr).toString()
    //   }))
    // )
  }
  return res
}
