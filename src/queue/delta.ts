import { Fabric } from 'fabric/types'
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
    connector: () => new BehaviorSubject<ColorPalette>(paletteFrom(4)),
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
    const div = aspect[0]
    const mult = aspect[1]

    const rows = Math.floor((Math.sqrt(dimensions.height) / div) * mult)
    const columns = Math.floor((Math.sqrt(dimensions.width) / div) * mult)
    const colorMatrix = createColorStreamIO(colors, rows, columns)

    return Array.from<unknown, Fabric>({ length: rows }, (_, rowKey) => ({
      id: uuid(),
      columns: Array.from({ length: columns }, (_, columnKey) => ({
        id: uuid(),
        rgbStr: colorMatrix[rowKey][columnKey]
      }))
    }))
  })
)
