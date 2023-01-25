import {
  debounceTime,
  fromEvent,
  map,
  share,
  startWith
} from 'rxjs'

export interface WindowDimensions {
  width: number
  height: number
}

export const getWindowDimensions =
  (): WindowDimensions => ({
    width: window.innerWidth,
    height: window.innerHeight
  })

export const windowResizeEvent$ = fromEvent(
  window,
  'resize'
).pipe(
  debounceTime(300),
  startWith(getWindowDimensions),
  map(getWindowDimensions),
  share({
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
)
