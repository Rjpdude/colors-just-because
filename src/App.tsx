// import { FabricComponent } from 'fabric/Fabric'
import { registerUiDeltaQueue } from 'queue/delta'
import { useEffect } from 'react'
import { Playground } from 'playground/Playground'
import { GlobalStyle } from 'styles/global'

const App = () => {
  useEffect(() => {
    const subscription = registerUiDeltaQueue()
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  return (
    <div className="App">
      <GlobalStyle background="" />
      <Playground />
      {/* <FabricComponent /> */}
    </div>
  )
}

export default App
