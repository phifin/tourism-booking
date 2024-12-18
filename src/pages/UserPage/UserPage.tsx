// UserPage.tsx
import { Outlet } from 'react-router-dom'

export default function UserPage() {
  return (
    <div className='flex'>
      <div className='w-64 h-screen bg-gray-50 p-4'>
        <div className='text-gray-900 font-bold'>Nguyen Quoc Khanh</div>
        <ul className='mt-4'>
          <li className='mb-2'>
            <a href='/user/account' className='text-gray-700'>
              Account Information
            </a>
          </li>
          <li className='mb-2'>
            <a href='/user/settings' className='text-gray-700'>
              Settings
            </a>
          </li>
          <li className='mb-2'>
            <a href='/user/mybooking' className='text-gray-700'>
              My Booking
            </a>
          </li>
          <li className='mb-2'>
            <a href='/user/refunds' className='text-gray-700'>
              Refunds
            </a>
          </li>
        </ul>
      </div>
      <div className='flex-1 p-6'>
        <Outlet /> {/* Render the corresponding child route content here */}
      </div>
    </div>
  )
}
