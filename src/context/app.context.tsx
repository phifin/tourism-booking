import { createContext, useState, useEffect } from 'react'
import { getAccessTokenFromLS } from '~/utils/auth'
import React from 'react'
import { jwtDecode } from 'jwt-decode'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  userEmail: string
  setUserEmail: React.Dispatch<React.SetStateAction<string>>
  isAppLoading: boolean
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  userEmail: '', // Initial email can be empty
  setUserEmail: () => null,
  isAppLoading: true
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [userEmail, setUserEmail] = useState<string>(initialAppContext.userEmail)
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true)

  useEffect(() => {
    // Re-check authentication status on app reload
    setIsAuthenticated(Boolean(getAccessTokenFromLS()))
  }, [])
  useEffect(() => {
    const token = getAccessTokenFromLS()
    if (token) {
      try {
        const decodedToken = jwtDecode<{ sub: string }>(token) // Decode token
        // Note: 'sub' is email. For some reason, in J2EE I can't make it: payload.email
        setUserEmail(decodedToken.sub) // Truy cập email từ payload
      } catch (error) {
        console.error('Invalid token:', error)
      }
    }
    setIsAppLoading(false)
  }, [])

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, userEmail, setUserEmail, isAppLoading }}>
      {children}
    </AppContext.Provider>
  )
}
