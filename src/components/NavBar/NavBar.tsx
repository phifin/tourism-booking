import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const location = useLocation()
  const selectedUI = 'border rounded-full bg-slate-50 bg-opacity-10'
  const unselectedUI = 'rounded-full hover:bg-slate-50 hover:bg-opacity-10'
  const defaultRouteUI = {
    defaultPage: unselectedUI,
    carRental: unselectedUI,
    attractions: unselectedUI,
    flights: unselectedUI
  }
  if (location.pathname === '/') {
    defaultRouteUI.defaultPage = selectedUI
  } else if (location.pathname === '/carsRental') {
    defaultRouteUI.carRental = selectedUI
  } else if (location.pathname === '/attractions') {
    defaultRouteUI.attractions = selectedUI
  } else if (location.pathname === '/flights') {
    defaultRouteUI.flights = selectedUI
  }
  return (
    <div className='flex gap-5 w-4/5 mx-auto mt-3 text-white'>
      <Link to='/' className={`flex ml-5 py-3 px-5 ${defaultRouteUI.defaultPage}`}>
        <span className='pr-2'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20px' height='20px' fill='white'>
            <path d='M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25m0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18m22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0m-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0m-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25m0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75z'></path>
          </svg>
        </span>
        <span>Stays</span>
      </Link>
      <Link to='/carsRental' className={`flex py-3 px-5 ${defaultRouteUI.carRental}`}>
        <span className='pr-2'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20px' height='20px' fill='white'>
            <path d='m21.684 9.443-1.7-3.79c-.42-1.128-1.542-1.905-2.794-1.903H6.809a3 3 0 0 0-2.811 1.947L2.316 9.443a.75.75 0 1 0 1.368.614l1.7-3.79c.238-.63.798-1.018 1.424-1.017h10.383a1.5 1.5 0 0 1 1.407.973l1.718 3.834a.75.75 0 1 0 1.368-.614M.75 16.468V18a2.25 2.25 0 0 0 4.5 0v-1.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 1-1.5 0v-1.532a.75.75 0 0 0-1.5 0m21 0V18a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 0-1.5 0V18a2.25 2.25 0 0 0 4.5 0v-1.532a.75.75 0 0 0-1.5 0M19.875 13.5a.375.375 0 0 1-.375-.375.75.75 0 0 0 1.5 0c0-.621-.504-1.125-1.125-1.125a.75.75 0 0 0 0 1.5m.375-.375a.375.375 0 0 1-.375.375.75.75 0 0 0 0-1.5c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 0 1.5 0m-.375-.375c.207 0 .375.168.375.375a.75.75 0 0 0-1.5 0c0 .621.504 1.125 1.125 1.125a.75.75 0 0 0 0-1.5m-.375.375c0-.207.168-.375.375-.375a.75.75 0 0 0 0 1.5c.621 0 1.125-.504 1.125-1.125a.75.75 0 0 0-1.5 0M4.125 12C3.504 12 3 12.504 3 13.125a.75.75 0 0 0 1.5 0 .375.375 0 0 1-.375.375.75.75 0 0 0 0-1.5m1.125 1.125c0-.621-.504-1.125-1.125-1.125a.75.75 0 0 0 0 1.5.375.375 0 0 1-.375-.375.75.75 0 0 0 1.5 0M4.125 14.25c.621 0 1.125-.504 1.125-1.125a.75.75 0 0 0-1.5 0c0-.207.168-.375.375-.375a.75.75 0 0 0 0 1.5M3 13.125c0 .621.504 1.125 1.125 1.125a.75.75 0 0 0 0-1.5c.207 0 .375.168.375.375a.75.75 0 0 0-1.5 0M2.75 10.5h18.5c.69 0 1.25.56 1.25 1.25v3.75a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25v-3.75c0-.69.56-1.25 1.25-1.25m0-1.5A2.75 2.75 0 0 0 0 11.75v3.75c0 .966.784 1.75 1.75 1.75h20.5A1.75 1.75 0 0 0 24 15.5v-3.75A2.75 2.75 0 0 0 21.25 9z'></path>
          </svg>
        </span>
        <span>Car Rentals</span>
      </Link>
      <Link to='/attractions' className={`flex py-3 px-5 ${defaultRouteUI.attractions}`}>
        <span className='pr-2'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20px' height='20px' fill='white'>
            <path d='M13.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M15 3a3 3 0 1 0-6 0 3 3 0 0 0 6 0m6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0M6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0M21 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0m-9-3.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0M6 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0m10.066 1.277a7.5 7.5 0 0 1-3.077 2.05.75.75 0 0 0 .498 1.415 9 9 0 0 0 3.693-2.46.75.75 0 1 0-1.114-1.005m1.798-6.466c.177.922.183 1.869.015 2.792a.75.75 0 1 0 1.476.268c.2-1.106.194-2.24-.019-3.344a.75.75 0 1 0-1.472.284m-5.337-5.784a7.5 7.5 0 0 1 3.54 2.196.75.75 0 0 0 1.113-1.004 9 9 0 0 0-4.247-2.636.75.75 0 1 0-.406 1.444M6.434 6.223a7.5 7.5 0 0 1 3.539-2.196.75.75 0 1 0-.406-1.444A9 9 0 0 0 5.32 5.219a.75.75 0 0 0 1.114 1.004M4.636 12.69a7.6 7.6 0 0 1 0-2.878.75.75 0 1 0-1.472-.284 9.1 9.1 0 0 0 0 3.446.75.75 0 0 0 1.472-.284m4.876 5.639a7.5 7.5 0 0 1-3.035-2.005.75.75 0 0 0-1.106 1.014 9 9 0 0 0 3.641 2.405.75.75 0 1 0 .5-1.414M7.31 21.872A1.5 1.5 0 0 0 8.672 24h6.656a1.5 1.5 0 0 0 1.362-2.128l-3.314-8.217c-.361-.785-1.252-1.114-2.005-.767a1.5 1.5 0 0 0-.733.734l-3.343 8.283zm1.377.595 3.328-8.25-.015.033 3.313 8.217.015.033H8.672z'></path>
          </svg>
        </span>
        <span>Attractions</span>
      </Link>
      <Link to='/flights' className={`flex py-3 px-5 ${defaultRouteUI.flights}`}>
        <span className='pr-2'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20px' height='20px' fill='white'>
            <path d='m20.505 7.5-15.266.022.672.415-1.1-2.2a.75.75 0 0 0-.638-.414l-2.293-.1C.82 5.228-.003 6.06.003 7.083c.002.243.051.484.146.709l2.072 4.68a2.95 2.95 0 0 0 2.701 1.778h4.043l-.676-1.075-2.484 5.168A1.83 1.83 0 0 0 7.449 21h2.099a1.85 1.85 0 0 0 1.419-.664l5.165-6.363-.582.277h4.956c1.82.09 3.399-1.341 3.49-3.198l.004-.134a3.426 3.426 0 0 0-3.44-3.419l-.074.001zm.02 1.5h.042a1.924 1.924 0 0 1 1.933 1.914l-.002.065a1.866 1.866 0 0 1-1.955 1.772l-4.993-.001a.75.75 0 0 0-.582.277l-5.16 6.355a.35.35 0 0 1-.26.118h-2.1a.336.336 0 0 1-.3-.49l2.493-5.185a.75.75 0 0 0-.676-1.075H4.924a1.45 1.45 0 0 1-1.328-.878l-2.07-4.676a.35.35 0 0 1 .326-.474l2.255.1-.638-.415 1.1 2.2a.75.75 0 0 0 .672.415L20.507 9zm-4.202-1.24-2.992-4.02A1.85 1.85 0 0 0 11.85 3H9.783a1.85 1.85 0 0 0-1.654 2.672l1.439 2.91a.75.75 0 0 0 1.344-.664l-1.44-2.911a.35.35 0 0 1 .312-.507h2.066a.35.35 0 0 1 .279.14l2.99 4.017a.75.75 0 1 0 1.203-.896z'></path>
          </svg>
        </span>
        <span>Flights</span>
      </Link>
    </div>
  )
}
