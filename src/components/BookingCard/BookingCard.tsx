import { useQuery } from '@tanstack/react-query'
import { toUpper } from 'lodash'
import { format } from 'date-fns' // Import thư viện date-fns
import travelApi from '~/apis/travels.api'

interface Props {
  travelId: string
  bookDate: Date
}

export default function BookingCard({ travelId, bookDate }: Props) {
  const { data: travelData, isLoading } = useQuery(['travel', travelId], () => travelApi.getTravelById(travelId))

  // Format ngày sử dụng date-fns
  const formattedDate = format(bookDate, 'yyyy-MM-dd HH:mm:ss')

  if (isLoading) {
    return (
      <div className='flex h-44 w-full shadow-lg my-10 mx-auto rounded-xl overflow-hidden animate-pulse'>
        <div className='w-1/4 flex-shrink-0 bg-gray-300'></div>
        <div className='w-3/4 p-3'>
          <div className='h-6 bg-gray-300 rounded mb-4 w-1/2'></div>
          <div className='h-4 bg-gray-300 rounded mb-3 w-3/4'></div>
          <div className='h-4 bg-gray-300 rounded mb-3 w-1/3'></div>
          <div className='h-4 bg-gray-300 rounded mb-3 w-1/4'></div>
          <div className='h-6 bg-gray-300 rounded w-1/4 mt-3 ml-auto'></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex h-44 w-full shadow-lg my-10 mx-auto rounded-xl overflow-hidden`}>
      <div className='w-1/4 flex-shrink-0'>
        <img src={travelData?.imageUrl[0]} className='w-full h-full object-cover' alt='travelImage'></img>
      </div>
      <div className='w-3/4'>
        <div className='ml-3 mt-3 text-2xl font-bold'>{travelData?.title}</div>
        <div className='h-9 ml-3 mt-4 w-full pr-6 line-clamp-2'>{travelData?.description}</div>
        <div className='ml-3 mt-3 text-blue-900 font-semibold'>Type: {toUpper(travelData?.travelType)}</div>
        <div className='ml-3 mt-1'>Booking Date: {formattedDate}</div>
        <div className='flex ml-56'>
          <div className='ml-96 w-52 text-xl font-bold text-blue-900'>${travelData?.price}.00 USD</div>
        </div>
      </div>
    </div>
  )
}
