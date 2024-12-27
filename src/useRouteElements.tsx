import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthenticationLayout from './layouts/AuthencationLayout'
import PageHeader from './components/header'
import TourDetails from './pages/TourDetails'
import { AppContext } from './context/app.context'
import HomePage from './pages/HomePage'
import BookingHistory from './pages/BookingHistory'
import SocialPage from './pages/SocialPage.tsx'
import TravelPage from './pages/TravelPage'
import NotFoundPage from './pages/404Page'
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
          path: '/hotel',
          element: (
            <PageHeader>
              <TravelPage travelType='Hotel' />
            </PageHeader>
          ),
          index: true
        },
        {
          path: '/carRental',
          element: (
            <PageHeader>
              <TravelPage travelType='CarRental' />
            </PageHeader>
          )
        },
        {
          path: '/tour',
          element: (
            <PageHeader>
              <TravelPage travelType='Tour' />
            </PageHeader>
          )
        },
        {
          path: '/flight',
          element: (
            <PageHeader>
              <TravelPage travelType='Flight' />
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
              <SocialPage />
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
    },

    {
      path: '*',
      element: <NotFoundPage />
    }
  ])
  return routeElements
}
