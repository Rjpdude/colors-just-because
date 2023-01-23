import { FabricBlock, FabricCol, FabricRow, FabricWrapper } from './styles'
import { useWindowDimensions } from 'hooks/useWindowSize'
import { useMemo } from 'react'
import { v4 as uuid } from 'uuid'

export const Fabric = () => {
  const [width, height] = useWindowDimensions()

  const grid = useMemo(() => {
    if (width == -1 || height == -1) {
      return []
    }
    const row = (columns: number) => ({
      id: uuid(),
      columns: Array(columns)
        .fill([])
        .map((arr) => ({
          id: uuid(),
          blocks: arr.fill([])
        }))
    })

    return Array(Math.floor(Math.sqrt(height) * 2))
      .fill([])
      .map(() => row(Math.floor(Math.sqrt(width) * 2)))
  }, [width, height])

  return (
    <FabricWrapper>
      {grid.length > 0 &&
        grid.map((row, id) => (
          <FabricRow key={id}>
            {row.columns.map((col, colId) => (
              <FabricCol key={colId}>
                <FabricBlock />
              </FabricCol>
            ))}
          </FabricRow>
        ))}
    </FabricWrapper>
  )
}
