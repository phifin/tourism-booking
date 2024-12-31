import { useQuery } from '@tanstack/react-query'
import { toUpper } from 'lodash'
import travelApi from '~/apis/travels.api'

interface Props {
  travelId: string
  amount: number
  onDrop: () => void
  onAdd: () => void
  onMinus: () => void
}
export default function BookingCartCard({ travelId, amount, onDrop, onAdd, onMinus }: Props) {
  const { data: traavelData } = useQuery(['travel', travelId], () => travelApi.getTravelById(travelId))

  // const handle

  // Format ngày sử dụng date-fns

  return (
    <div className={`flex h-44 w-full shadow-lg my-10 mx-auto rounded-xl overflow-hidden`}>
      <div className='w-1/4 flex-shrink-0'>
        <img src={traavelData?.imageUrl[0]} className='w-full h-full object-cover' alt='travelImage'></img>
      </div>
      <div className='w-3/4'>
        <div className='flex justify-between items-center'>
          <div className='ml-3 mt-3 text-2xl font-bold'>{traavelData?.title}</div>
          <div className='flex'>
            <div className='mr-2 py-2 px-3 bg-green-800 text-white rounded-lg cursor-pointer' onClick={onAdd}>
              +
            </div>
            <div className='mr-2 py-2 px-3 bg-red-800 text-white rounded-lg cursor-pointer' onClick={onMinus}>
              -
            </div>
            <div className='py-2 px-2 bg-blue-800 text-white rounded-lg cursor-pointer' onClick={onDrop}>
              Delete
            </div>
          </div>
        </div>
        <div className='h-9 ml-3 mt-4 w-full pr-6 line-clamp-2'>{traavelData?.description}</div>
        <div className='ml-3 mt-3 text-blue-900 font-semibold'>Type: {toUpper(traavelData?.travelType)}</div>
        <div className='ml-3 mt-1'>Amount: {amount}</div>
        <div className='flex ml-56'>
          <div className='ml-96 w-52 text-xl font-bold text-blue-900'>${traavelData?.price}.00 USD</div>
        </div>
      </div>
    </div>
  )
}
