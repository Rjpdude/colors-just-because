import { debounceTime, fromEvent, map, share } from 'rxjs'

export interface KeyboardEvent {
  keydownValue: string
}

export const getWindowDimensions = (
  event: KeyboardEventInit
): KeyboardEvent => ({
  keydownValue: event.key ?? ''
})

export const keyboardEvent$ = fromEvent(
  document,
  'keydown'
).pipe(
  debounceTime(250),
  map(getWindowDimensions),
  share({
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
)
