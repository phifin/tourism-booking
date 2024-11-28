import React from 'react'

export default function HomePage() {
  return (
    <div className='w-3/4 mx-auto mt-10'>
      <div className='w-full mx-auto '>
        <div className=' h-96 w-full mx-auto'>
          <img src='/src/assets/bareBanner2.jpeg' alt='banner' className='w-full h-full object-fill' />
        </div>
        <div className='flex h-72 grid grid-cols-6 gap-7 mx-auto mt-12'>
          <img src='/src/assets/bareBanner.avif' alt='banner' className='col-span-3  h-full object-fill' />
          <img src='/src/assets/newYearBanner.avif' alt='banner' className='col-span-3 h-full object-fil' />
        </div>
        <div className='h-96 col-span-12 mx-auto mt-28'>
          <img src='/src/assets/christmas.avif' alt='banner' className='w-full h-full object-fill' />
        </div>
      </div>
    </div>
  )
}
