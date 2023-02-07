import * as R from 'ramda'

export const sqrt = R.compose(Math.sqrt)
export const ceil = R.compose(Math.ceil)
export const floor = R.compose(Math.floor)
export const abs = R.compose(Math.abs)
export const xOverY = R.divide(R.__)

/** Window ratios (WIP) */

export const windowRatio = R.curryN(
  3,
  (div: number, mult: number, num: number) =>
    floor(R.multiply(xOverY(sqrt(num), div), mult))
)

export const fromDimensions = ([d, m]) =>
  R.chain<number, number>(windowRatio(d, m))
