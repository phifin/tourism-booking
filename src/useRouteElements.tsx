import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthenticationLayout from './layouts/AuthencationLayout'
import PageHeader from './components/header'
import Stays from './pages/Stays'
import CarRental from './pages/CarRental/CarRental'
import Attractions from './pages/Attractions'
import Flights from './pages/Flights'
import TourDetails from './pages/TourDetails'
import { AppContext } from './context/app.context'
import HomePage from './pages/HomePage'
import BookingHistory from './pages/BookingHistory'
import SocialPost from './pages/SocialPost'
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext) // Use context for authentication state
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext) // Use context for authentication state
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <PageHeader>
          <HomePage />
        </PageHeader>
      ),
      index: true
    },
    {
      element: <ProtectedRoute />, // Apply ProtectedRoute here
      children: [
        {
          path: '/stays',
          element: (
            <PageHeader>
              <Stays />
            </PageHeader>
          ),
          index: true
        },
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
        },
        {
          path: '/travel/:id',
          element: (
            <PageHeader>
              <TourDetails />
            </PageHeader>
          )
        },
        {
          path: '/bookinghistory',
          element: (
            <PageHeader>
              <BookingHistory />
            </PageHeader>
          )
        },
        {
          path: '/socialposts',
          element: (
            <PageHeader>
              <SocialPost />
            </PageHeader>
          )
        }
      ]
    },

    {
      element: <RejectedRoute />, // Apply RejectedRoute here
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
    }
  ])
  return routeElements
}
