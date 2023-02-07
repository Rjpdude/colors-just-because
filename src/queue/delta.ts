import { createColorStreamIO } from 'io/color'
import { v4 as uuid } from 'uuid'
import {
  Subject,
  share,
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map
} from 'rxjs'
import { paletteFrom } from 'styles/palettes'
import { windowDimensions$ } from './window'
import { fromDimensions } from 'io/declarations'
import { range } from 'ramda'

export type AspectRatio = [number, number]
export const aspectRatioSource$ = new Subject<AspectRatio>()
export const aspectRatio$ = aspectRatioSource$.pipe(
  share({
    connector: () => new BehaviorSubject<AspectRatio>([1, 1]),
    resetOnError: false,
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
)

export type ColorPalette = string[]
export const colorPaletteSource$ = new Subject<ColorPalette>()
export const colorPalette$ = colorPaletteSource$.pipe(
  share({
    connector: () => new BehaviorSubject<ColorPalette>(paletteFrom(1)),
    resetOnError: false,
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
)

export const fabric$ = combineLatest([
  windowDimensions$,
  aspectRatio$,
  colorPalette$
]).pipe(
  debounceTime(100),
  map(([dimensions, aspect, colors]) => {
    const [rows, columns] = fromDimensions(aspect)([
      dimensions.height,
      dimensions.width
    ])

    const xAxis = range(0, rows)
    const yAxis = range(0, columns)
    const colorMatrix = createColorStreamIO(colors, rows, columns)

    return xAxis.map((_, rIndx) => ({
      id: uuid(),
      columns: yAxis.map((_, cIndx) => ({
        id: uuid(),
        rgbStr: colorMatrix[rIndx][cIndx]
      }))
    }))
  })
)
