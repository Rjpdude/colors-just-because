import { FabricBlock, FabricCol, FabricRow, FabricWrapper } from './styles'
import { useEffect, useState } from 'react'
import { Fabric } from './types'
import { deltaObservable } from 'queue/delta'

export const FabricComponent = () => {
  const [matrix, setMatrix] = useState<Fabric[]>()

  useEffect(() => {
    const sub = deltaObservable.subscribe((res) => {
      console.log(res)
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
                <FabricBlock />
              </FabricCol>
            ))}
          </FabricRow>
        ))}
    </FabricWrapper>
  )
}
