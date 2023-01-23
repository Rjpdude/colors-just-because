import { useState, useEffect } from 'react'
import { windowResizeEvent } from 'registry/events'

export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState([-1, -1])

  useEffect(() => {
    const sub = windowResizeEvent.subscribe(setDimensions)
    return () => {
      sub.unsubscribe()
    }
  }, [])

  return dimensions
}
