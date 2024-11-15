import React from 'react'

export default function SearchBar() {
  return (
    <div className='flex w-full mt-12 h-16 rounded-lg border-4 border-yellow-400 text-black'>
      <input
        type='text'
        placeholder='Where are you going? '
        className='w-1/3 focus:outline-none border-2 border-yellow-400 px-4'
      />
      <input
        type='text'
        placeholder='Price range'
        className='w-1/3 focus:outline-none border-x-4 border-y-2 border-yellow-400 px-4'
      />
      <input
        type='text'
        placeholder='Time budget'
        className='w-1/3 focus:outline-none border-y-2 border-l-2 border-r-4 border-yellow-400 px-4'
      />
      <button className='w-32 text-center p-2 bg-blue-700 text-white text-lg  hover:bg-blue-900 rounded-lg'>
        Search
      </button>
    </div>
  )
}
