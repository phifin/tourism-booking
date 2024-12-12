import './App.css'
import useRouteElements from './useRouteElements'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

function App() {
  const routeElements = useRouteElements()

  return (
    <div>
      <Provider store={store}>{routeElements}</Provider>
    </div>
  )
}

export default App
