import React from 'react'

export default function HomePage() {
  return (
    <div className='w-3/4 mx-auto mt-10'>
      <div className='w-full mx-auto '>
        <div className=' h-96 w-full mx-auto'>
          <header className='text-2xl font-bold'>Super Hot Sale</header>
          <img src='/src/assets/bareBanner2.jpeg' alt='banner' className='w-full h-full object-fill mt-5' />
        </div>
        <div className='h-72  mx-auto mt-28'>
          <header className='text-2xl font-bold'>12.12 Big Sale Coming</header>
          <div className='flex grid grid-cols-6 gap-7 mt-5'>
            <img src='/src/assets/bareBanner.avif' alt='banner' className='col-span-3  h-full object-fill' />
            <img src='/src/assets/newYearBanner.avif' alt='banner' className='col-span-3 h-full object-fil' />
          </div>
        </div>
        <div className='h-96 col-span-12 mx-auto mt-40'>
          <header className='text-2xl font-bold'>Big Sale For Christmas</header>
          <img src='/src/assets/christmas.avif' alt='banner' className='w-full h-full object-fill mt-5' />
        </div>
      </div>
    </div>
  )
}
