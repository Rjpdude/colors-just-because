import { Fabric } from 'fabric/types'
import { ColorStream } from 'io/color'
import { generateMatrix } from 'io/matrix'
import { Subject, share, mergeWith, interval } from 'rxjs'
import { Identifiable } from 'types'
import { keyboardEvent$ } from './keyboard'
import { windowResizeEvent$ } from './window'

export interface Published {
  matrix: Identifiable<Fabric>[]
  colorstream: Identifiable<ColorStream>[][]
}

const published = new Subject<Published>()

export const deltaObservable = published.pipe(
  share({
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
)

export const queueInterval$ = interval(750).pipe(
  share({
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
)

export enum Delegator {
  keyboard,
  window
}

export const registerUiDeltaQueue = () => {
  return queueInterval$
    .pipe(mergeWith(windowResizeEvent$, keyboardEvent$))
    .subscribe((buffer) => {
      if (typeof buffer === 'number') {
        return
      }
      // if (buffer.type === Delegator.keyboard) {
      // }
      if (buffer.type === Delegator.window) {
        published.next({
          matrix: generateMatrix(buffer) as any,
          colorstream: []
        })
      }
    })
}
