import React from 'react'
import LoginHeader from '~/components/LoginHeader'

interface Props {
  children?: React.ReactNode
}

export default function AuthenticationLayout({ children }: Props) {
  return (
    <div>
      <LoginHeader />
      {children}
    </div>
  )
}
