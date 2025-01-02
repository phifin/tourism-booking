import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
interface SearchBarProps {
  onSearch: (query: { keyword: string; priceRange: string; timeBudget: string }) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const { t } = useTranslation()
  const [keyword, setKeyword] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [timeBudget, setTimeBudget] = useState('')
  const location = useLocation()
  const handleSearch = () => {
    onSearch({ keyword, priceRange, timeBudget })
  }
  useEffect(() => {
    setKeyword('')
    setPriceRange('')
    setTimeBudget('')
  }, [location.pathname])
  return (
    <div
      className='flex w-full -mt-20 h-16 rounded-lg border-4 text-black'
      style={{ borderColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <input
        type='text'
        placeholder={t('where_are_you_going')}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className='w-1/3 rounded-tl-lg rounded-bl-lg border-r-2 px-4'
        style={{ borderColor: 'rgba(0, 0, 0, 0.3)' }}
      />
      <input
        type='text'
        placeholder={t('price_range')}
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className='w-1/3 border-r-2 px-4'
        style={{ borderColor: 'rgba(0, 0, 0, 0.3)' }}
      />
      <input
        type='text'
        placeholder={t('time_budget')}
        value={timeBudget}
        onChange={(e) => setTimeBudget(e.target.value)}
        className='w-1/3  border-r-2 px-4'
        style={{ borderColor: 'rgba(0, 0, 0, 0.3)' }}
      />
      <button
        className='w-32 text-center p-2 bg-blue-700 text-white text-lg hover:bg-blue-900 rounded-tr-lg rounded-br-lg'
        onClick={handleSearch}
      >
        {t('search')}
      </button>
    </div>
  )
}
