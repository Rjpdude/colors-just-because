import * as Style from 'fabric/styles'
import { useEffect, useState } from 'react'
import { Fabric } from 'fabric/types'
import { fabric$ } from 'queue/delta'

export const Playground = () => {
  const [matrix, setMatrix] = useState<Fabric[]>([])

  useEffect(() => {
    const sub = fabric$.subscribe((matrix) => {
      setMatrix(matrix)
    })
    return () => sub.unsubscribe()
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
