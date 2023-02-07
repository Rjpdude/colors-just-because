import { AspectRatio, aspectRatioSource$ } from 'queue/delta'
import { zoomScan } from 'queue/keyboard'
import { useEffect } from 'react'

const defaultAR: AspectRatio = [1, Math.PI]

export const useZoomScan = () => {
  useEffect(() => {
    const subscription = zoomScan.subscribe((zoom) =>
      aspectRatioSource$.next(
        zoom === 0 ? defaultAR : [1.2 * (zoom + 1), Math.PI]
      )
    )
    return () => subscription.unsubscribe()
  }, [])
}
