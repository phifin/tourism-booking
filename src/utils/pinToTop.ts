import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) // Scrolls to the top of the page
  }, [pathname]) // Triggers when the URL (pathname) changes

  return null // This component doesn’t render anything
}

export default ScrollToTop
