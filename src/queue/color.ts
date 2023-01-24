import { sortedColorsFromRgbArr } from 'io/color.io'
import { palettes } from 'playground/config/palettes'
import { map, share, startWith, Subject } from 'rxjs'

const source$ = new Subject<string[]>()

export const rgbColorSelection$ = source$
  .asObservable()
  .pipe(
    startWith(palettes[4]),
    share({
      resetOnComplete: false,
      resetOnRefCountZero: false
    })
  )

export const sortedColorSelection$ =
  rgbColorSelection$.pipe(map(sortedColorsFromRgbArr))
