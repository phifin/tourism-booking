import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthenticationLayout from './layouts/AuthencationLayout'
import PageHeader from './components/header'
import Stays from './pages/Stays'
import CarRental from './pages/CarRental/CarRental'
import Attractions from './pages/Attractions'
import Flights from './pages/Flights'
const isAuthenticated = false
function ProtectedRoute() {
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/carsRental',
          element: (
            <PageHeader>
              <CarRental />
            </PageHeader>
          )
        },
        {
          path: '/attractions',
          element: (
            <PageHeader>
              <Attractions />
            </PageHeader>
          )
        },
        {
          path: '/flights',
          element: (
            <PageHeader>
              <Flights />
            </PageHeader>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <AuthenticationLayout>
              <Login />
            </AuthenticationLayout>
          )
        },
        {
          path: '/register',
          element: (
            <AuthenticationLayout>
              <Register />
            </AuthenticationLayout>
          )
        }
      ]
    },
    {
      path: '/',
      index: true,
      element: (
        <PageHeader>
          <Stays />
        </PageHeader>
      )
    }
  ])
  return routeElements
}
