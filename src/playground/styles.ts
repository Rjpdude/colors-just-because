import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex: 1 0;
  width: 100%;
`

export const Col = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
`

interface Block {
  bg: string
}

export const Block = styled.div.attrs<Block>((props) => ({
  style: { backgroundColor: props.bg }
}))<Block>`
  display: flex;
  flex: 1 0 0;
`
