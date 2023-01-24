import { FabricBlock, FabricCol, FabricRow, FabricWrapper } from 'fabric/styles'
import { useEffect, useState } from 'react'
import { Fabric } from 'fabric/types'
import { deltaObservable } from 'queue/delta'
import { createColorStreamIO } from 'io/color.io'
import { paletteFrom } from './config/palettes'

export const Playground = () => {
  const [matrix, setMatrix] = useState<Fabric[]>()
  const [colors, setColors] = useState<string[][]>([])

  useEffect(() => {
    const sub = deltaObservable.subscribe((res) => {
      const colorMatrix = createColorStreamIO(
        paletteFrom(4),
        res.matrix.length,
        res.matrix[0].columns.length
      )
      // console.log(res.matrix)
      // console.log(colorMatrix)
      setColors(colorMatrix)
      setMatrix(res.matrix)
    })
    return () => sub.unsubscribe()
  }, [])

  return (
    <FabricWrapper>
      {matrix &&
        matrix.map((row, id) => (
          <FabricRow key={id}>
            {row.columns.map((col, colId) => (
              <FabricCol key={colId}>
                <FabricBlock
                  style={{
                    backgroundColor: colors[id][colId]
                  }}
                />
              </FabricCol>
            ))}
          </FabricRow>
        ))}
    </FabricWrapper>
  )
}
