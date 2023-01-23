import { Subject, asyncScheduler, share } from 'rxjs'

interface PublishedState {
  sum: number
}

interface QueuedState {
  pending: number[]
}

const published = new Subject<PublishedState>()

export const queue2$ = published.pipe(
  share({
    resetOnError: false,
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
)

asyncScheduler.schedule<QueuedState>(
  function (queued) {
    if (queued && queued.pending.length > 0) {
      this.schedule({
        pending: []
      })
      published.next({
        sum: queued.pending.reduce((a, b) => a + b, 0)
      })
    }
  },
  200,
  { pending: [] }
)

// const state = new Observable<QueuedState>((observer) => {
//   observer.next({
//     val: 10
//   })
//   observer.complete()
// }).pipe(observeOn(asyncScheduler, 2500))

// export const queue$ = connectable(state, {
//   connector: () => new Subject()
// })
