import * as Style from 'fabric/styles'
import { useEffect, useState } from 'react'
import { Fabric } from 'fabric/types'
import { deltaObservable } from 'queue/delta'
import { createColorStreamIO } from 'io/color'
import { paletteFrom } from 'styles/palettes'

export const Playground = () => {
  const [matrix, setMatrix] = useState<Fabric[]>()
  const [colors, setColors] = useState<string[][]>([])

  useEffect(() => {
    const sub = deltaObservable.subscribe(({ matrix }) => {
      const colorMatrix = createColorStreamIO(
        paletteFrom(4),
        matrix.length,
        matrix[0].columns.length
      )
      setColors(colorMatrix)
      setMatrix(matrix)
    })
    return () => sub.unsubscribe()
  }, [])

  return (
    <Style.FabricWrapper>
      {matrix &&
        matrix.map((row, id) => (
          <Style.FabricRow key={id}>
            {row.columns.map((col, colId) => (
              <Style.FabricCol key={colId}>
                <Style.FabricBlock
                  style={{
                    backgroundColor: colors[id][colId]
                  }}
                />
              </Style.FabricCol>
            ))}
          </Style.FabricRow>
        ))}
    </Style.FabricWrapper>
  )
}
