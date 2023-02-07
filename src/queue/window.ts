import { BehaviorSubject, fromEvent, map, share } from 'rxjs'

export interface WindowDimensions {
  width: number
  height: number
}

export const getWindowDimensions = (): WindowDimensions => ({
  width: window.innerWidth,
  height: window.innerHeight
})

export const windowResizeSource$ = fromEvent(window, 'resize')

export const windowDimensions$ = windowResizeSource$.pipe(
  map(getWindowDimensions),
  share({
    connector: () => new BehaviorSubject(getWindowDimensions()),
    resetOnError: false,
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
)

// export const windowResizeEvent$ = fromEvent(
//   window,
//   'resize'
// ).pipe(
//   debounceTime(300),
//   startWith(getWindowDimensions),
//   map(getWindowDimensions),
//   share({
//     resetOnComplete: false,
//     resetOnRefCountZero: false
//   })
// )
