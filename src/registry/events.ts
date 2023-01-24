import { fromEvent, map, share } from 'rxjs'

export const windowResizeEvent = fromEvent(window, 'resize').pipe(
  map(() => [window.innerWidth, window.innerHeight]),
  share()
)
