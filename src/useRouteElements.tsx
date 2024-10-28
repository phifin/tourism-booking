import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PageFooter from './layouts/footer'
export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '/login',
      element: <PageFooter children={<Login />} />
    },
    {
      path: '/register',
      element: <Register />
    }
  ])
  return routeElements
}
