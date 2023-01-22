import { createGlobalStyle } from 'styled-components'

export interface DefaultThemeProps {
  background: string
}

const GlobalStyle = createGlobalStyle<DefaultThemeProps>`
  body {

  }
`
export { GlobalStyle }
