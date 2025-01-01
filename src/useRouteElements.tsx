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
import UserPage from './pages/UserPage/UserPage'
import MyAccount from './components/user/MyAccount/MyAccount'
import MyBooking from './components/user/MyBooking/MyBooking.tsx'
import MyCards from './components/user/MyCards/MyCards.tsx'
import MyProgression from './components/user/MyProgression/MyProgression.tsx'
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
        },
        {
          path: '/user',
          element: (
            <PageHeader showNavBar={false}>
              <UserPage />
            </PageHeader>
          )
        },
        {
          path: '/user/account',
          element: (
            <PageHeader showNavBar={false}>
              <UserPage>
                <MyAccount />
              </UserPage>
            </PageHeader>
          )
        },
        {
          path: '/user/booking',
          element: (
            <PageHeader showNavBar={false}>
              <UserPage>
                <MyBooking />
              </UserPage>
            </PageHeader>
          )
        },
        {
          path: '/user/cards',
          element: (
            <PageHeader showNavBar={false}>
              <UserPage>
                <MyCards />
              </UserPage>
            </PageHeader>
          )
        },
        {
          path: '/user/coins',
          element: (
            <PageHeader showNavBar={false}>
              <UserPage>
                <MyProgression />
              </UserPage>
            </PageHeader>
          )
        },
        {
          path: '/user/*',
          element: (
            <PageHeader showNavBar={false}>
              <UserPage />
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
