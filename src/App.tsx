import { Playground } from 'playground/Playground'
import { registryContext } from 'registry/registry'

const App = () => {
  return (
    <registryContext.Provider value={{ documentHeight: -1, documentWidth: -1 }}>
      <div className="App">
        <Playground />
      </div>
    </registryContext.Provider>
  )
}

export default App
