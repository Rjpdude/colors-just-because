import { debounceTime, fromEvent, map, share } from 'rxjs'

export const windowResizeEvent = fromEvent(window, 'resize').pipe(
  debounceTime(500),
  map(() => [window.innerWidth, window.innerHeight]),
  share()
)
