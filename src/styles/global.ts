import { createGlobalStyle } from 'styled-components'

export interface DefaultThemeProps {
  background: string
}

export const GlobalStyle = createGlobalStyle<DefaultThemeProps>`
  body {
    margin: 0;
    height: 100vh;
  }

  #root {
    height: 100%;
  }

  .App {
    height: 100%;
    display: flex;
    flex: 1;
  }
`
