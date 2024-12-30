import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store'
import { toggleUserTravelingBookmark } from '~/store/user.slice'

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
  const userRedux = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()

  const handleCardClick = () => {
    navigate(`/travel/${id}`)
  }

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering `handleCardClick`
    dispatch(
      toggleUserTravelingBookmark({
        id: userRedux.data!.id,
        travelId: id
      })
    )
    if (userRedux?.data?.bookmarksId != undefined && userRedux?.data?.bookmarksId.includes(id)) {
      toast.warning('Removed from bookmark!')
    } else {
      toast.success('Added to bookmark!')
    }
  }

  if (userRedux.loading || userRedux.data == null) return <div>Loading...</div>
  if (userRedux.error) return <div>Error: {userRedux.error}</div>

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
          className={
            userRedux?.data?.bookmarksId != undefined && userRedux?.data?.bookmarksId.includes(id)
              ? 'text-red-600 hover:text-red-800'
              : 'text-gray-700 hover:text-gray-900'
          }
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
