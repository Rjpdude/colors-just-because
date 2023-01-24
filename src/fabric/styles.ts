import styled from 'styled-components'

export const FabricWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const FabricRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex: 1 0;
  width: 100%;
`

export const FabricCol = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
`

export const FabricBlock = styled.div`
  display: flex;
  flex: 1 0 0;

  &:hover {
    cursor: pointer;
    border: 2px solid rgba(10, 10, 10, 0.2);
  }
`
