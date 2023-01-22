import styled from 'styled-components'

export const Container = styled.div`
  margin: 24px -16px;
  display: flex;
  flex: 1;
`

export const HexTable = styled.div`
  display: flex;
  flex-direction: column;
  margin: -4px 0;
  padding: 0 16px;
  width: 100%;

  &.side {
    width: 0%;
  }
`

export const HexRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex: 1 0 40px;
  width: 100%;

  &.unlink {
    margin: 4px 0;
  }
`

export const Col = styled.div`
  display: flex;
  flex-direction: row;
  flex: 13 1;
  width: 100%;

  &.center {
    flex: 1 1;
  }

  &.flip {
    flex-direction: row-reverse;
  }
`

export interface IHexBlock {
  bg: string
}

export const HexBlock = styled.div.attrs<IHexBlock>((props) => ({
  style: {
    background: props.bg
  }
}))<IHexBlock>`
  transition: 0.1s ease-in-out;
  display: flex;
  flex: 1;
`
