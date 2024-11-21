import { createContext, useState, useEffect } from 'react'
import { getAccessTokenFromLS } from '~/utils/auth'
import React from 'react'
import { jwtDecode } from 'jwt-decode'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  userEmail: string
  setUserEmail: React.Dispatch<React.SetStateAction<string>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  userEmail: '', // Initial email can be empty
  setUserEmail: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [userEmail, setUserEmail] = useState<string>(initialAppContext.userEmail)

  useEffect(() => {
    // Re-check authentication status on app reload
    setIsAuthenticated(Boolean(getAccessTokenFromLS()))
  }, [])
  useEffect(() => {
    const token = getAccessTokenFromLS()
    if (token) {
      try {
        const decodedToken = jwtDecode<{ payload: { email: string } }>(token) // Decode token
        setUserEmail(decodedToken.payload.email) // Truy cập email từ payload
      } catch (error) {
        console.error('Invalid token:', error)
      }
    }
  }, [])

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, userEmail, setUserEmail }}>
      {children}
    </AppContext.Provider>
  )
}
