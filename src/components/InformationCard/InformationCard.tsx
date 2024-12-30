import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

interface InformationProps {
  id: string
  title: string
  place: string
  imgUrl: string
  price: number
  ratings: number
}

export default function InformationCard({ id, title, place, imgUrl, ratings, price }: InformationProps) {
  const navigate = useNavigate()
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleCardClick = () => {
    navigate(`/travel/${id}`)
  }

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering `handleCardClick`
    setIsBookmarked(!isBookmarked)
    toast.success(isBookmarked ? 'Removed from bookmark' : 'Added to bookmark')
  }

  return (
    <div
      onClick={handleCardClick}
      className='h-96 w-full col-span-3 shadow-2xl my-10 mx-auto rounded-xl overflow-hidden cursor-pointer relative'
    >
      {/* Image */}
      <img src={imgUrl} className='h-3/5 w-full object-cover' alt='Card Image' />

      {/* Bookmark Button */}
      <button onClick={toggleBookmark} className='absolute top-0 right-3 text-2xl text-gray-700 hover:text-gray-900'>
        <FontAwesomeIcon
          icon={faBookmark}
          className={isBookmarked ? 'text-red-600 hover:text-red-800' : 'text-gray-700 hover:text-gray-900'}
        />
      </button>

      {/* Card Content */}
      <header className='mt-3 ml-2 text-xl font-bold'>{title}</header>
      <div className='mt-1 ml-2 text-gray-500'>{place}</div>
      <div className='mt-1 ml-2 text-yellow-500'>Ratings: {ratings}</div>
      <div className='mt-1 ml-2 text-green-600 font-semibold'>${price.toFixed(2)}</div>
    </div>
  )
}
