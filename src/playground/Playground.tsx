import { ColorStream } from 'io/color.types'
import { useState, useEffect } from 'react'
import { Container, HexTable, HexRow, Col, HexBlock } from './styles'
import { v4 as uuid } from 'uuid'
import { createColorStream } from 'io/color.io'
import { paletteFrom } from './config/palettes'

export const Playground = () => {
  const [mtrx, setMtrx] = useState<ColorStream[]>([])

  useEffect(() => {
    const palette = paletteFrom(2)
    createColorStream(palette, (colors) => {
      return setMtrx((m) =>
        (m.length === palette.length ? [] : m).concat({
          id: uuid(),
          colors
        })
      )
    })
  }, [])

  return (
    <Container>
      <HexTable>
        {mtrx.map(({ id: mtrxId, colors }) => (
          <>
            <HexRow key={mtrxId}>
              {colors.map(({ id: colorId, rgbstr }) => (
                <Col key={colorId}>
                  <HexBlock bg={rgbstr} />
                </Col>
              ))}
            </HexRow>
          </>
        ))}
      </HexTable>
    </Container>
  )
}
