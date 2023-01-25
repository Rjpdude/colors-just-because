import {
  debounceTime,
  fromEvent,
  map,
  share,
  startWith
} from 'rxjs'
import { Delegator } from './delta'

export interface WindowDimensions {
  type: Delegator.window
  width: number
  height: number
}

export const getWindowDimensions =
  (): WindowDimensions => ({
    type: Delegator.window,
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
