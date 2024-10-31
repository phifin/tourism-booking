import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavBar from '../NavBar'

interface Props {
  children: React.ReactNode
}

interface PageInfo {
  title: string
  description: string
}

const pageData: Record<string, PageInfo> = {
  '/carsRental': {
    title: 'Car hire for any kind of trip',
    description: 'Great cars at great prices, from the biggest car rental companies'
  },
  '/flights': {
    title: 'Find the Perfect Flight for Every Journey',
    description: 'Affordable flights worldwide from top airlines to suit every journey.'
  },
  '/attractions': {
    title: 'Attractions, activities, and experiences',
    description: 'Discover new attractions and experiences to match your interests and travel style'
  }
}

export default function PageHeader({ children }: Props) {
  const location = useLocation()

  // Retrieve page title and description based on path
  const { title, description } = pageData[location.pathname] || {
    title: 'Where to next, Phi?',
    description: 'Find exclusive Genius rewards in every corner of the world!'
  }

  return (
    <div>
      <div className='h-96 bg-blue-900'>
        <div className='flex w-4/5 mx-auto'>
          <div className='w-1/2'>
            <header className='text-white text-2xl font-extrabold ml-9 py-4'>
              <Link to='/'>Velocity</Link>
            </header>
          </div>
          <div className='w-1/2 flex justify-around text-white py-4'>
            <span>VietNam</span>
            <span>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px' fill='white'>
                <path d='M9.28 21.961a2.837 2.837 0 0 0 5.445 0 .75.75 0 1 0-1.44-.422 1.337 1.337 0 0 1-2.565 0 .75.75 0 1 0-1.44.422M12.75 3V.75a.75.75 0 0 0-1.5 0V3a.75.75 0 0 0 1.5 0m-.75.75a6.75 6.75 0 0 1 6.75 6.75c0 3.154.29 5.436.785 6.994.323 1.02.684 1.59.995 1.84L21 18H3l.59 1.212c.248-.315.572-.958.88-2 .49-1.66.78-3.872.78-6.712A6.75 6.75 0 0 1 12 3.75m0-1.5a8.25 8.25 0 0 0-8.25 8.25c0 2.702-.272 4.772-.72 6.288-.254.864-.493 1.336-.62 1.5A.75.75 0 0 0 3 19.5h18c.708 0 1.022-.892.47-1.335.019.016-.008-.015-.07-.113-.14-.223-.29-.553-.435-1.012-.443-1.396-.715-3.529-.715-6.54A8.25 8.25 0 0 0 12 2.25'></path>
              </svg>
            </span>
            <span>
              <Link to={'/'}>Listing your property</Link>
            </span>
            <span>userProfile</span>
          </div>
        </div>
        <NavBar />
        <div className='w-4/5 mt-12 mx-auto text-white'>
          <header className='ml-9 text-5xl font-extrabold'>{title}</header>
          <p className='ml-9 mt-5 text-2xl'>{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}
