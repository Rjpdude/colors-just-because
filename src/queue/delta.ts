import { Fabric } from 'fabric/types'
import { ColorStream } from 'io/color.io'
import { Subject, share, bufferTime } from 'rxjs'
import { Identifiable } from 'types'
import * as config from './config'
import { windowResizeEvent$ } from './windowSize'

export interface Published {
  matrix: Identifiable<Fabric>[]
  colorstream: Identifiable<ColorStream>[][]
}

export interface Queue {
  dimensions: number[]
}

const published = new Subject<Published>()
const queued = new Subject<Queue>()

export const deltaObservable = published.pipe(
  share({
    resetOnError: false,
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
)

export const registerUiDeltaQueue = () => {
  return [
    queued
      .pipe(bufferTime(config.QUEUE_TIME))
      .subscribe((bufferedIO) => {
        if (bufferedIO.length > 0) {
          const latest = bufferedIO[bufferedIO.length - 1]
          published.next({
            matrix: config.generateMatrix(
              latest.dimensions
            ) as any,
            colorstream: config.mapColorScheme(
              latest.dimensions
            )
          })
        }
      }),
    windowResizeEvent$.subscribe((dimensions) => {
      queued.next({
        dimensions: [dimensions.width, dimensions.height]
      })
    })
  ]
}
