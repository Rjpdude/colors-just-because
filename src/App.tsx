import { Playground } from 'playground/Playground'
import { RegistryContext } from 'registry/registry'
import { GlobalStyle } from 'styles/global'

const App = () => {
  return (
    <RegistryContext.Provider value={{ documentHeight: -1, documentWidth: -1 }}>
      <GlobalStyle background="" />
      <div className="App">
        <Playground />
      </div>
    </RegistryContext.Provider>
  )
}

export default App
