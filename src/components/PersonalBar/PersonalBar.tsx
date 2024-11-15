import React from 'react'
import { Link } from 'react-router-dom'

export default function PersonalBar() {
  return (
    <div className='flex gap-12 ml-3 font-bold'>
      <Link to='/' className='hover:bg-slate-400 py-3 px-7 rounded-2xl hover:bg-opacity-20'>
        Home
      </Link>
      <Link to='/' className='hover:bg-slate-400  py-3 px-7 rounded-2xl hover:bg-opacity-20'>
        My bookings
      </Link>
      <Link to='/' className='hover:bg-slate-400  py-3 px-7 rounded-2xl hover:bg-opacity-20'>
        My flights
      </Link>
      <Link to='/' className='hover:bg-slate-400  py-3 px-7 rounded-2xl hover:bg-opacity-20'>
        My rentals
      </Link>
      <Link to='/' className='hover:bg-slate-400  py-3 px-7 rounded-2xl hover:bg-opacity-20'>
        History
      </Link>
    </div>
  )
}
