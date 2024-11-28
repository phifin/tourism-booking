import React from 'react'

export default function TourDetails() {
  return (
    <div className='w-5/6 mx-auto mt-12 grid grid-cols-12 gap-2'>
      <div className='col-span-9 '>
        <div>
          <header className='font-bold text-2xl'>Majestic Hotel</header>
          <div className='flex items-center mt-2'>
            <svg xmlns='http://www.w3.org/2000/svg' width='30px' height='30px' viewBox='0 0 24 24' fill='none'>
              <path
                d='M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z'
                stroke='#000000'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z'
                stroke='#000000'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
            <address className='ml-1'>528 West Brompton, Lakeview, Chicago, IL 60657 , United States </address>
          </div>
          <img src='/src/assets/travelDetails.jpg' alt='img' className='mt-5' />
        </div>
      </div>
      <div className='h-44 col-span-3 border border-slate-500 border-opacity-50'>zzz</div>
    </div>
  )
}
