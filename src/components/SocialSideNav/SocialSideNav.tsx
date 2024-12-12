import React from 'react'

interface SocialSideNavProps {
  children: React.ReactNode
  opacity: string
}

export default function SocialSideNav({ children, opacity }: SocialSideNavProps) {
  return <div className={opacity}>{children}</div>
}
