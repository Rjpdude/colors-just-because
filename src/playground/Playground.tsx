import { Wrapper, Row, Col, Block } from 'playground/styles'
import { useEffect, useState } from 'react'
import { Fabric } from 'types'
import { fabric$ } from 'queue/delta'
import { useZoomScan } from './useZoomScan'

export const Playground = () => {
  const [matrix, setMatrix] = useState<Fabric[]>([])

  useEffect(() => {
    const sub = fabric$.subscribe(setMatrix)
    return () => {
      sub.unsubscribe()
    }
  }, [])

  useZoomScan()

  return (
    <Wrapper>
      {matrix.map(({ id, columns }) => (
        <Row key={id}>
          {columns.map((col) => (
            <Col key={col.id}>
              <Block bg={col.rgbStr} />
            </Col>
          ))}
        </Row>
      ))}
    </Wrapper>
  )
}
