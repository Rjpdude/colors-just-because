import { BehaviorSubject, fromEvent, map, scan, share } from 'rxjs'

export interface KeyboardEvent {
  keydownValue: string
}

export const getWindowDimensions = (
  event: KeyboardEventInit
): KeyboardEvent => ({
  keydownValue: event.key ?? ''
})

export const keyboardEvent$ = fromEvent(document, 'keydown').pipe(
  map(getWindowDimensions),
  share({
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
)

export const zoomScan = keyboardEvent$.pipe(
  scan((acc, { keydownValue }) => {
    if (keydownValue === 'ArrowUp') {
      return Math.min(acc + 1, 16)
    } else if (keydownValue === 'ArrowDown') {
      return acc <= 1 ? acc : acc - 1
    }
    return acc
  }, 0),
  share({
    connector: () => new BehaviorSubject(0),
    resetOnError: false,
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
)
