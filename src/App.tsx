import './App.css'
import useRouteElements from './useRouteElements'
import { Provider, useDispatch } from 'react-redux'
import { AppDispatch, store } from './store/index.ts'
import { useContext, useEffect } from 'react'
import { AppContext } from './context/app.context.tsx'
import { fetchUser } from './store/user.slice.ts'

const InitializeUser = ({ children }: { children: React.ReactNode }) => {
  const { userEmail } = useContext(AppContext)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (userEmail && userEmail.trim() !== '') {
      dispatch(fetchUser(userEmail))
    }
  }, [dispatch, userEmail])

  return <>{children}</>
}

function App() {
  const routeElements = useRouteElements()

  return (
    <div>
      <Provider store={store}>
        <InitializeUser>{routeElements}</InitializeUser>
      </Provider>
    </div>
  )
}

export default App
