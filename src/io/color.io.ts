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
    console.log('results', scaled)
    return scaled.rowDark
      .reverse()
      .slice(0, scaled.rowDark.length - 1)
      .concat(d3.hcl(color))
      .concat(scaled.rowLight)
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
      queueLight.c += dist[i].circumferance / 10
      queueLight.l += dist[i].circumferance / 20

      //queueDark.h += dist[i].circumferance / 20;
      queueDark.c -= dist[i].circumferance / 5
      queueDark.l -= dist[i].circumferance / 10

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
