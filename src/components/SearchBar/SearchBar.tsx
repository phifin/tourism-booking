import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SearchBarProps {
  onSearch: (query: { keyword: string; priceRange: string; timeBudget: string }) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [keyword, setKeyword] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [timeBudget, setTimeBudget] = useState('')
  const location = useLocation()

  const handleSearch = () => {
    onSearch({ keyword, priceRange, timeBudget })
  }

  // Reset input fields when route changes
  useEffect(() => {
    setKeyword('')
    setPriceRange('')
    setTimeBudget('')
  }, [location.pathname]) // Trigger reset when the pathname changes

  return (
    <div className='flex w-full -mt-20 h-16 rounded-lg border-4 border-yellow-400 text-black'>
      <input
        type='text'
        placeholder='Where are you going?'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className='w-1/3 focus:outline-none border-2 border-yellow-400 px-4'
      />
      <input
        type='text'
        placeholder='Price range (e.g., 100-500)'
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className='w-1/3 focus:outline-none border-x-4 border-y-2 border-yellow-400 px-4'
      />
      <input
        type='text'
        placeholder='Time budget'
        value={timeBudget}
        onChange={(e) => setTimeBudget(e.target.value)}
        className='w-1/3 focus:outline-none border-y-2 border-l-2 border-r-4 border-yellow-400 px-4'
      />
      <button
        className='w-32 text-center p-2 bg-blue-700 text-white text-lg hover:bg-blue-900 rounded-lg'
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  )
}
