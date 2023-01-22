import { AsymetricDistribution, UIColor } from './color.types'
import * as d3 from 'd3'
import { v4 as uuid } from 'uuid'

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

export const createColorStream = (
  hexOrRgbArr: string[],
  onStream: (stream: UIColor[]) => void
) => {
  const fibonacciArr = fibonacciSeq()

  const interpolateDefinitions = (indx: number, color: string) => {
    const genesisHcl = d3.hcl(color)
    const scaled = scaleHcl(indx, genesisHcl, fibonacciArr)

    const test1 = scaled.rowDark.reverse().slice(0, 6)
    const test2 = scaled.rowLight.slice(
      scaled.rowLight.length - 7,
      scaled.rowLight.length - 1
    )
    const selection = d3
      .quantize(d3.interpolateHcl(test1[0], test1[test1.length - 1]), 10)
      .concat(color)
      .concat(
        d3.quantize(d3.interpolateHcl(test2[0], test2[test1.length - 1]), 10)
      )
      .map((hcl) => d3.rgb(hcl).toString())
    //return selection
    console.log('result', selection)
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
      //queueLight.h -= dist[i].circumferance / 20;
      queueLight.c += dist[i].circumferance / 5
      queueLight.l += dist[i].circumferance / 2.5

      //queueDark.h += dist[i].circumferance / 20;
      queueDark.c -= dist[i].circumferance / 5
      queueDark.l -= dist[i].circumferance / 2.5

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
    onStream(
      colorDefinitions.map((rbgstr) => ({
        id: uuid(),
        rgb: d3.rgb(rbgstr),
        rgbstr: d3.rgb(rbgstr).toString()
      }))
    )
  }
}
