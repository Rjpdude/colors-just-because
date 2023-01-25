import { Fabric } from 'fabric/types'
import { ColorStream } from 'io/color'
import { generateMatrix } from 'io/matrix'
import { Subject, share, mergeWith, interval } from 'rxjs'
import { Identifiable } from 'types'
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

export const registerUiDeltaQueue = () => {
  return queueInterval$
    .pipe(mergeWith(windowResizeEvent$))
    .subscribe((buffer) => {
      if (typeof buffer === 'number') {
        return
      }
      published.next({
        matrix: generateMatrix(buffer) as any,
        colorstream: []
      })
    })
}
