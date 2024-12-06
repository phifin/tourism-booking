import { useQuery } from '@tanstack/react-query'
import { toUpper } from 'lodash'
import { format } from 'date-fns' // Import thư viện date-fns
import travelApi from '~/apis/travels.api'

interface Props {
  travelId: string
  bookDate: Date
}

export default function BookingCard({ travelId, bookDate }: Props) {
  const { data: traavelData } = useQuery(['travel', travelId], () => travelApi.getTravelById(travelId))

  // Format ngày sử dụng date-fns
  const formattedDate = format(bookDate, 'yyyy-MM-dd HH:mm:ss')

  return (
    <div className={`flex h-44 w-full shadow-lg my-10 mx-auto rounded-xl overflow-hidden`}>
      <div className='w-1/4 flex-shrink-0'>
        <img src={traavelData?.imageUrl[0]} className='w-full h-full object-cover' alt='travelImage'></img>
      </div>
      <div className='w-3/4'>
        <div className='ml-3 mt-3 text-2xl font-bold'>{traavelData?.title}</div>
        <div className='h-9 ml-3 mt-4 w-full pr-6 line-clamp-2'>{traavelData?.description}</div>
        <div className='ml-3 mt-3 text-blue-900 font-semibold'>Type: {toUpper(traavelData?.travelType)}</div>
        <div className='ml-3 mt-1'>Booking Date: {formattedDate}</div>
        <div className='flex ml-56'>
          <div className='ml-96 w-52 text-xl font-bold text-blue-900'>${traavelData?.price}.00 USD</div>
        </div>
      </div>
    </div>
  )
}
