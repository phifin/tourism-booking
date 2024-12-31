import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import NavBar from '../NavBar'
import { AppContext } from '~/context/app.context'
import PersonalBar from '../PersonalBar'
// import SearchBar from '../SearchBar'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'

interface Props {
  children: React.ReactNode
  showNavBar?: boolean
}

PageHeader.defaultProps = {
  showNavBar: true
}

interface PageInfo {
  title: string
}

const pageData: Record<string, PageInfo> = {
  '/carRental': {
    title: 'Car hire for any kind of trip'
  },
  '/flight': {
    title: 'Find the Perfect Flight for Every Journey'
  },
  '/tour': {
    title: 'Attractions, activities, and experiences'
  },
  '/hotel': {
    title: 'Choose your favourable home'
  }
}

export default function PageHeader({ children, showNavBar }: Props) {
  const { isAuthenticated, setIsAuthenticated, isAppLoading } = useContext(AppContext)
  const userRedux = useSelector((state: RootState) => state.user)

  const location = useLocation()
  const navigate = useNavigate()
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const toggleDropdown = () => {
    setIsUserDropdownVisible(!isUserDropdownVisible)
  }
  const dropdownRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownVisible(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Kiểm tra nếu cuộn xuống một khoảng nhất định, ví dụ 50px
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Lắng nghe sự kiện cuộn
    window.addEventListener('scroll', handleScroll)

    // Xóa sự kiện khi component bị hủy
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const logOut = () => {
    localStorage.removeItem('accessToken')
    setIsAuthenticated(false)
    navigate('/login')
  }
  // Retrieve page title and description based on path
  const { title } = pageData[location.pathname] || {
    title: 'Where to next?',
    description: 'Find exclusive Genius rewards in every corner of the world!'
  }

  if (userRedux.loading || isAppLoading) return <div>Loading...</div>
  if (userRedux.error) return <div>Error: {userRedux.error}</div>

  const topNavigationBar = (
    <div className='relative z-50'>
      <div
        className={classNames('top-0 z-50 w-full bg-cover bg-center overscroll-none', {
          'fixed bg-white text-black shadow-md transition-all duration-300 ease-in-out': isScrolled && showNavBar,
          'bg-transparent text-white transition-all duration-300 ease-in-out': !isScrolled && showNavBar,
          'fixed bg-white text-black shadow-md': !showNavBar
        })}
      >
        <div className='flex w-4/5 mx-auto '>
          <div className='w-1/2'>
            <header className='text-2xl font-extrabold ml-9 pt-6 pb-4'>
              <Link to='/'>Velocity</Link>
            </header>
          </div>
          <div className='w-2/3 mr-10 flex justify-around items-center font-semibold pb-3 pt-5'>
            <span className='px-5 py-4 hover:bg-slate-50 hover:bg-opacity-10'>VietNam</span>
            <span className='px-5 py-4 hover:bg-slate-50 hover:bg-opacity-10'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24px'
                height='24px'
                fill={isScrolled || !showNavBar ? 'black' : 'white'}
              >
                <path d='M9.28 21.961a2.837 2.837 0 0 0 5.445 0 .75.75 0 1 0-1.44-.422 1.337 1.337 0 0 1-2.565 0 .75.75 0 1 0-1.44.422M12.75 3V.75a.75.75 0 0 0-1.5 0V3a.75.75 0 0 0 1.5 0m-.75.75a6.75 6.75 0 0 1 6.75 6.75c0 3.154.29 5.436.785 6.994.323 1.02.684 1.59.995 1.84L21 18H3l.59 1.212c.248-.315.572-.958.88-2 .49-1.66.78-3.872.78-6.712A6.75 6.75 0 0 1 12 3.75m0-1.5a8.25 8.25 0 0 0-8.25 8.25c0 2.702-.272 4.772-.72 6.288-.254.864-.493 1.336-.62 1.5A.75.75 0 0 0 3 19.5h18c.708 0 1.022-.892.47-1.335.019.016-.008-.015-.07-.113-.14-.223-.29-.553-.435-1.012-.443-1.396-.715-3.529-.715-6.54A8.25 8.25 0 0 0 12 2.25'></path>
              </svg>
            </span>
            <span className='px-5 py-4 hover:bg-slate-50 hover:bg-opacity-10'>
              <Link to={'/'}>List your property</Link>
            </span>
            {isAuthenticated ? (
              <span
                className=' px-5 py-4 relative cursor-pointer hover:bg-slate-50 hover:bg-opacity-10'
                ref={dropdownRef}
                onClick={toggleDropdown}
              >
                <div className='flex justify-center items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 32 32'
                    aria-hidden='true'
                    role='presentation'
                    fill={isScrolled || !showNavBar ? 'black' : 'white'}
                    width={27}
                    height={27}
                  >
                    <path d='M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z'></path>
                  </svg>
                  <span className='ml-2 text-lg'>{userRedux.data?.firstName || 'Guest'}</span>
                </div>
                <span
                  className={classNames(
                    'flex flex-col transition transform w-56 h-68 bg-white font-extralight text-sm text-black border rounded-lg absolute top-14 right-0 ',
                    {
                      'opacity-100 scale-100 translate-y-0 pointer-events-auto': isUserDropdownVisible,
                      'opacity-0 scale-60 -translate-y-5 duration-400 ease-out pointer-events-none':
                        !isUserDropdownVisible
                    }
                  )}
                >
                  <Link to={'/user/account'}>
                    <span className='flex py-4 pl-5 hover:bg-slate-500 hover:bg-opacity-10'>
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          width='16px'
                          height='16px'
                          className='mr-3'
                        >
                          <path d='M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0M18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0M3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0'></path>
                        </svg>
                      </span>
                      Manage Account
                    </span>
                  </Link>
                  <span className='py-4 pl-5 flex hover:bg-slate-500 hover:bg-opacity-10'>
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='16px'
                        height='16px'
                        className='mr-3'
                      >
                        <path d='M22.5 14.249v4.5a2.25 2.25 0 0 1-2.25 2.25H3.75a2.25 2.25 0 0 1-2.25-2.25v-9a2.25 2.25 0 0 1 2.25-2.25h16.5a2.25 2.25 0 0 1 2.25 2.25zm1.5 0v-4.5a3.75 3.75 0 0 0-3.75-3.75H3.75A3.75 3.75 0 0 0 0 9.749v9a3.75 3.75 0 0 0 3.75 3.75h16.5a3.75 3.75 0 0 0 3.75-3.75zm-18-7.5v15a.75.75 0 0 0 1.5 0v-15a.75.75 0 0 0-1.5 0m10.5 0v15a.75.75 0 0 0 1.5 0v-15a.75.75 0 0 0-1.5 0m0 0v-3a2.25 2.25 0 0 0-2.25-2.25h-4.5a2.25 2.25 0 0 0-2.25 2.25v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 0 1.5 0'></path>
                      </svg>
                    </span>
                    Bookings & Trips
                  </span>
                  <span className='py-4 pl-5 flex hover:bg-slate-500 hover:bg-opacity-10'>
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='16px'
                        height='16px'
                        className='mr-3'
                      >
                        <path d='M18.004 0A5.975 5.975 0 0 0 13.5 9.936l-.177-.625-.657 3.78a.75.75 0 0 0 1.133.766l3.423-2.11-.562.092A5.996 5.996 0 1 0 17.999 0zM18 1.5a4.496 4.496 0 1 1-1.004 8.877.75.75 0 0 0-.562.093l-3.423 2.11 1.133.767.657-3.78a.75.75 0 0 0-.178-.625A4.475 4.475 0 0 1 17.996 1.5zM9.375 13.125a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0m1.5 0a4.125 4.125 0 1 0-8.25 0 4.125 4.125 0 0 0 8.25 0m2.618 10.025a6.804 6.804 0 0 0-13.486 0 .75.75 0 1 0 1.486.2 5.304 5.304 0 0 1 10.514 0 .75.75 0 1 0 1.486-.2'></path>
                      </svg>
                    </span>
                    Reviews
                  </span>
                  <span className='py-4 pl-5 flex hover:bg-slate-500 hover:bg-opacity-10'>
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='16px'
                        height='16px'
                        className='mr-3'
                      >
                        <path d='m12.541 21.325-9.588-10a4.923 4.923 0 1 1 6.95-6.976l1.567 1.566a.75.75 0 0 0 1.06 0l1.566-1.566a4.923 4.923 0 0 1 6.963 6.962l-9.6 10.014zm-1.082 1.038a.75.75 0 0 0 1.082 0l9.59-10.003a6.42 6.42 0 0 0-.012-9.07 6.423 6.423 0 0 0-9.083-.001L11.47 4.854h1.06l-1.566-1.566a6.423 6.423 0 1 0-9.082 9.086l9.577 9.99z'></path>
                      </svg>
                    </span>
                    Saved
                  </span>
                  <Link to='/login' onClick={logOut} className='py-4 pl-5 flex hover:bg-slate-500 hover:bg-opacity-10'>
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 128 128'
                        width='16px'
                        height='16px'
                        className='mr-3'
                      >
                        <path d='m1.19 66.83 20 20a4.002 4.002 0 1 0 5.66-5.66L13.67 68H88a4 4 0 0 0 0-8H13.67l13.18-13.17a4.002 4.002 0 1 0-5.66-5.66l-20 20q-.275.28-.5.6s0 .11-.08.16a3 3 0 0 0-.28.53 2 2 0 0 0-.08.24 3 3 0 0 0-.15.51 3.9 3.9 0 0 0 0 1.58q.054.261.15.51.033.122.08.24.115.274.28.52c0 .06.05.11.08.16q.225.325.5.61m31.13 35c20.876 19.722 53.787 18.787 73.509-2.089 14.874-15.743 18.432-39.058 8.931-58.521-10.77-22.12-42-37.41-69.52-24a52 52 0 0 0-12.91 8.93 4.004 4.004 0 0 1-5.49-5.83 60 60 0 0 1 14.9-10.29C67.26-2.37 106.48 6 122 37.74c14.519 29.787 2.142 65.704-27.645 80.223-22.44 10.938-49.308 6.839-67.465-10.293a4 4 0 0 1 5.48-5.82z'></path>
                      </svg>
                    </span>
                    Log out
                  </Link>
                </span>
              </span>
            ) : (
              ''
            )}
            {!isAuthenticated ? (
              <span className='flex'>
                <Link
                  to='/login'
                  className='py-3 px-5 mr-5 bg-white text-blue-500 font-semibold rounded-lg hover:bg-blue-300 hover:bg-opacity-95'
                >
                  Log in
                </Link>
                <Link
                  to='/register'
                  className='py-3 px-5 bg-white text-blue-500 font-semibold rounded-lg hover:bg-blue-300 hover:bg-opacity-95'
                >
                  Sign up
                </Link>
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='ml-36'>
          <PersonalBar />
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div className={showNavBar ? "pt-20 h-120 bg-[url('/src/assets/mountains.avif')] bg-cover bg-center" : ''}>
        <div className={showNavBar ? 'absolute top-0 left-0 w-full z-10' : 'top-0 left-0 w-full z-10'}>
          {topNavigationBar}
        </div>

        {showNavBar ? (
          <div className='mt-12 mx-auto text-white'>
            <header className='pt-12 ml-44 text-5xl font-extrabold'>{title}</header>
            <div className='mx-auto mt-10'>
              <NavBar />
            </div>
          </div>
        ) : (
          <div className='mt-12 mx-auto text-white pt-12 ml-44 text-5xl font-extrabold'>placeholder</div>
        )}
      </div>
      {children}
    </div>
  )
}
