import * as Style from 'fabric/styles'
import { useEffect, useState } from 'react'
import { Fabric } from 'fabric/types'
import { fabric$ } from 'queue/delta'
import { useZoomScan } from './useZoomScan'

export const Playground = () => {
  const [matrix, setMatrix] = useState<Fabric[]>([])

  useEffect(() => {
    const sub = fabric$.subscribe((matrix) => {
      setMatrix(matrix)
    })
    return () => {
      sub.unsubscribe()
    }
  }, [])

  useZoomScan()

  return (
    <Style.FabricWrapper>
      {matrix.map(({ id, columns }) => (
        <Style.FabricRow key={id}>
          {columns.map(({ id: colId, rgbStr }) => (
            <Style.FabricCol key={colId}>
              <Style.FabricBlock
                style={{
                  backgroundColor: rgbStr
                }}
              />
            </Style.FabricCol>
          ))}
        </Style.FabricRow>
      ))}
    </Style.FabricWrapper>
  )
}
