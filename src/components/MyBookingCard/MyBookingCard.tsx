import { useQuery } from '@tanstack/react-query'
import React from 'react'
import travelApi from '~/apis/travels.api'
import { BookingModel } from '~/models/booking.model'

interface TravelCardProps {
  bookData: BookingModel
}

const MyBookingCard: React.FC<TravelCardProps> = ({ bookData }) => {
  const { data: travelData } = useQuery(['travel', bookData.travelId], () => travelApi.getTravelById(bookData.travelId))

  return (
    <div className='flex items-center justify-between p-4 bg-white rounded-lg shadow-md my-4'>
      <div className='flex items-center'>
        {/* Thumbnail */}
        <div className='w-20 h-20 overflow-hidden rounded-lg'>
          <img src={travelData?.imageUrl[0]} alt='Travel Thumbnail' className='w-full h-full object-cover' />
        </div>

        {/* Text Content */}
        <div className='ml-4'>
          <h2 className='text-lg font-semibold text-gray-800'>{travelData?.title}</h2>
          <p className='text-sm text-gray-600'>{travelData?.price}</p>
        </div>
      </div>

      {/* Price */}
      <div className='text-right'>
        <p className='text-gray-500 text-sm'>Total</p>
        <p className='text-xl font-bold text-gray-800'>${travelData?.price.toFixed(2)}</p>
      </div>

      {/* Tags */}
      <div className='flex space-x-2'>
        <span className='px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-200 rounded-full'>
          {travelData?.travelType}
        </span>
        <span
          className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${
            travelData?.title === 'Active' ? 'bg-green-500' : 'bg-gray-400'
          }`}
        >
          Active
        </span>
      </div>
    </div>
  )
}

export default MyBookingCard
