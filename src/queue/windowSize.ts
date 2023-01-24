import { debounceTime, fromEvent, map, startWith } from 'rxjs'

export const getWindowDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight
})

export const windowResizeEvent$ = fromEvent(window, 'resize').pipe(
  debounceTime(100),
  startWith(getWindowDimensions),
  map(getWindowDimensions)
)
