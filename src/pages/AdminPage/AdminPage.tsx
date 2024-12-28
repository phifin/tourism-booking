import React, { useState } from 'react'
import CarForm from '~/components/CarForm.tsx'
import FlightForm from '~/components/FlightForm'
import TourForm from '~/components/TourForm'
import HotelForm from '~/components/HotelForm'

export default function AdminPage() {
  const [propertyType, setPropertyType] = useState('Tour') // Mặc định là 'Tour'

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(event.target.value)
  }

  const renderForm = () => {
    switch (propertyType) {
      case 'Hotel':
        return <HotelForm />
      case 'Car':
        return <CarForm />
      case 'Flight':
        return <FlightForm />
      case 'Tour':
        return <TourForm />
      default:
        return null
    }
  }

  return (
    <div className='mt-10 pb-16 w-1/2 mx-auto'>
      <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
      <div className='mt-4 border border-gray-400 shadow-md'>
        <header className='min-w-56 mt-5 ml-3 text-xl font-semibold'>Enter the information of property</header>
        <div className='text-lg flex ml-3 mt-3'>
          <h2>Choose the type of property</h2>
          <select className='ml-2' value={propertyType} onChange={handleChange}>
            <option value='Tour'>Tour</option>
            <option value='Hotel'>Hotel</option>
            <option value='Flight'>Flight</option>
            <option value='Car'>Car</option>
          </select>
        </div>
        <div className='mt-2'>{renderForm()}</div>
      </div>
    </div>
  )
}
