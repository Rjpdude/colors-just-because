import * as Style from 'fabric/styles'
import { useEffect, useState } from 'react'
import { Fabric } from 'fabric/types'
import { aspectRatioSource$, fabric$ } from 'queue/delta'
import { zoomScan } from 'queue/keyboard'

export const FabricUi = () => {
  const [matrix, setMatrix] = useState<Fabric[]>([])

  useEffect(() => {
    const sub = fabric$.subscribe((matrix) => {
      setMatrix(matrix)
    })

    const sub2 = zoomScan.subscribe((zoom) => {
      if (zoom === 0) {
        aspectRatioSource$.next([Math.PI, Math.PI])
      } else if (zoom > 0) {
        aspectRatioSource$.next([1 * (1 + 1 * zoom), Math.PI])
      }
    })

    return () => {
      sub.unsubscribe()
      sub2.unsubscribe()
    }
  }, [])

  return (
    <Style.FabricWrapper>
      {matrix.map((row, id) => (
        <Style.FabricRow key={id}>
          {row.columns.map((col) => (
            <Style.FabricCol key={col.id}>
              <Style.FabricBlock
                style={{
                  backgroundColor: col.rgbStr
                }}
              />
            </Style.FabricCol>
          ))}
        </Style.FabricRow>
      ))}
    </Style.FabricWrapper>
  )
}
