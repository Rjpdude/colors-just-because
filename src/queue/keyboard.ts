import { debounceTime, fromEvent, map, share } from 'rxjs'
import { Delegator } from './delta'

export interface KeyboardEvent {
  type: Delegator.keyboard
  keydownValue: string
}

export const getWindowDimensions = (
  event: KeyboardEventInit
): KeyboardEvent => ({
  type: Delegator.keyboard,
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
