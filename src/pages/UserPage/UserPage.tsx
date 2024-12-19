import { Outlet, Link, useLocation } from 'react-router-dom' // Import Link
import React, { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCoins,
  faContactCard,
  faRectangleList,
  faShoppingCart,
  faMoneyBill1Wave,
  faBell,
  faUserGroup,
  faEnvelope,
  faCog,
  faPowerOff
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { UserModel } from '~/models/user.model'

interface MenuItem {
  icon: React.ReactNode
  label: string
  path: string // New field for navigation paths
}

const menuItems: MenuItem[] = [
  { icon: <FontAwesomeIcon icon={faCoins} />, label: '0', path: '/user/coins' },
  { icon: <FontAwesomeIcon icon={faContactCard} />, label: 'My Cards', path: '/user/cards' },
  { icon: <FontAwesomeIcon icon={faRectangleList} />, label: 'My Booking', path: '/user/booking' },
  { icon: <FontAwesomeIcon icon={faShoppingCart} />, label: 'Purchase List', path: '/user/purchases' },
  { icon: <FontAwesomeIcon icon={faMoneyBill1Wave} />, label: 'Refunds', path: '/user/refunds' },
  { icon: <FontAwesomeIcon icon={faBell} />, label: 'Flight Price Alerts', path: '/user/alerts' },
  { icon: <FontAwesomeIcon icon={faUserGroup} />, label: 'Saved Passenger Details', path: '/user/passengers' },
  { icon: <FontAwesomeIcon icon={faEnvelope} />, label: 'Promo Info', path: '/user/promo' },
  { icon: <FontAwesomeIcon icon={faCog} />, label: 'My Account', path: '/user/account' },
  { icon: <FontAwesomeIcon icon={faPowerOff} />, label: 'Logging Out', path: '/logout' }
]

const ProfileSidebar: React.FC<{ userData: UserModel }> = ({ userData }) => {
  const location = useLocation()

  // const [chosenIndex, setChosenIndex] = React.useState(0)

  const defaultButtonStyle = 'p-2 flex items-center space-x-3 text-gray-700 hover:bg-gray-100 cursor-pointer'
  const chosenButtonStyle = 'p-2 flex items-center space-x-3 bg-blue-400 text-white font-semibold cursor-pointer'

  return (
    <div className='w-80 bg-white border rounded-lg shadow-md'>
      {/* Profile Header */}
      <div className='p-6 border-b'>
        <div className='flex items-center'>
          <div className='w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full text-2xl font-bold'>
            {userData.firstName[0].toUpperCase()}
            {userData.lastName[0].toUpperCase()}
          </div>
          <div className='ml-4'>
            <h1 className='text-lg font-bold'>
              {userData.firstName} {userData.lastName}
            </h1>
            <p className='text-gray-500'>Google</p>
          </div>
        </div>
        {/* Badge */}
        <div className='mt-4 bg-gradient-to-r from-[#d4af7a] to-[#b9824f] rounded-md text-white px-4 py-2 flex items-center justify-between'>
          <span className='text-sm'>
            🧸 You're our <strong>Bronze Priority</strong>
          </span>
          <span>›</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className='pb-2 space-y-1'>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {/* <Link to={item.path} onClick={() => setChosenIndex(index)}> */}
            <Link to={item.path}>
              <div className={location.pathname === item.path ? chosenButtonStyle : defaultButtonStyle}>
                <span className='w-6 h-6 flex items-center justify-center'>{item.icon}</span>
                <span className='font-medium'>{item.label}</span>
              </div>
            </Link>

            {/* Divider */}
            {(index === 1 || index === 7) && (
              <div className='px-4'>
                <hr className='border-t border-gray-200 my-2' />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

interface UserPageProps {
  children?: ReactNode
}

export default function UserPage({ children }: UserPageProps) {
  const userRedux = useSelector((state: RootState) => state.user)

  if (userRedux.loading || userRedux.data == null) return <div>Loading...</div>
  if (userRedux.error) return <div>Error: {userRedux.error}</div>

  return (
    <div className='mt-10 w-2/3 mx-auto space-y-11'>
      <div className='flex space-x-4'>
        <ProfileSidebar userData={userRedux.data!} />
        <div className='flex-1 px-6'>{children || <Outlet />}</div>
      </div>
    </div>
  )
}
