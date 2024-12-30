import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import travelApi from '~/apis/travels.api'
import { Hotel, Tour, TravelModel } from '~/models/travels.model'

// interface Props {
//   id: string // Thêm id để xác định thẻ
//   image: string
//   title: string
//   city?: string
//   description: string
//   ratings: number
//   price: number
//   height: string // New prop for controlling the container height
// }

export function ShimmerEffectList({ count }: { count: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <ShimmerEffect key={index} />
      ))}
    </div>
  )
}

export function ShimmerEffect() {
  return (
    <div className='flex animate-pulse h-50 w-full shadow-lg my-10 mx-auto rounded-xl overflow-hidden'>
      <div className='w-1/4 bg-gray-300'></div>
      <div className='w-3/4 p-3 space-y-3'>
        <div className='h-6 w-3/4 bg-gray-300 rounded'></div>
        <div className='h-4 w-full bg-gray-300 rounded'></div>
        <div className='h-4 w-2/3 bg-gray-300 rounded'></div>
        <div className='flex justify-between mt-4'>
          <div className='h-4 w-16 bg-gray-300 rounded'></div>
          <div className='h-6 w-24 bg-gray-300 rounded'></div>
        </div>
      </div>
    </div>
  )
}

function RatingBadge({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(true)

  const [rating, setRating] = useState(0)

  useEffect(() => {
    travelApi.getTravelRatingById(id).then((res) => {
      setRating(res)
      setIsLoading(false)
    })
  }, [])

  return !isLoading ? (
    <div className='w-52'>
      <span
        className={`px-2 py-1 mr-2 rounded-lg border-1 
    ${rating >= 3 ? 'bg-green-600' : rating < 2 ? 'bg-red-600' : 'bg-yellow-500'} 
    text-white`}
      >
        {rating}
      </span>
      <span>{rating >= 4 ? 'Excellent' : rating >= 3 ? 'Very Good' : rating >= 2.5 ? 'Good' : 'Bad'}</span>
    </div>
  ) : (
    <div className='w-52 flex items-center space-x-4'>
      <div className='w-12 h-6 rounded-lg bg-gray-200 shimmer' />
      <div className='w-24 h-4 rounded bg-gray-200 shimmer' />
    </div>
  )
}

export function InformationLongCard({ travelData }: { travelData: TravelModel }) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    console.log('Clicked on card with id:', travelData.id)

    navigate(`/travel/${travelData.id}`) // Chuyển hướng đến URL chi tiết
  }

  return (
    <div
      onClick={handleCardClick} // Gọi hàm điều hướng khi nhấn vào thẻ
      className={`flex h-44 w-full shadow-lg my-10 mx-auto rounded-xl overflow-hidden cursor-pointer`}
    >
      <div className='w-1/4 flex-shrink-0'>
        <img
          src={travelData.imageUrl[0]}
          className='w-full h-full object-cover'
          alt='Card Image'
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
          }}
        ></img>
      </div>
      <div className='w-3/4'>
        <div className='ml-3 mt-3 text-2xl font-bold'>{travelData.title}</div>
        <div className='ml-3 mt-4 w-full pr-6 line-clamp-2'>{travelData.description}</div>
        <div className='ml-3 mt-3'>{'city' in travelData ? (travelData as Hotel | Tour).city : undefined}</div>
        <div className='flex mt-3 ml-3'>
          <RatingBadge id={travelData.id} />
          {/* <div className='w-52'>
            <span
              className={`px-2 py-1 mr-2 rounded-lg border-1 
    ${travelData.rating >= 3 ? 'bg-green-600' : travelData.rating < 2 ? 'bg-red-600' : 'bg-yellow-500'} 
    text-white`}
            >
              {travelData.rating}
            </span>
            <span>
              {travelData.rating >= 4
                ? 'Excellent'
                : travelData.rating >= 3
                ? 'Very Good'
                : travelData.rating >= 2.5
                ? 'Good'
                : 'Bad'}
            </span>
          </div> */}

          <div className='ml-96 w-52 text-xl font-bold text-blue-900'>${travelData.price}.00 USD</div>
        </div>
      </div>
    </div>
  )
}
