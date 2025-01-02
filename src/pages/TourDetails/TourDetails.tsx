import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import travelApi from '~/apis/travels.api'
import { Tour, Hotel, Flight, CarRental } from '~/models/travels.model'
import { useState } from 'react'
import BookInformationForm from '~/components/BookInformationForm'
import BookingAddToCartForm from '~/components/BookingAddToCartForm'
import TravelReview from '~/components/TravelReview'
import { postApi } from '~/apis/post.api'
interface Comment {
  id: string
  content: string
  rating: number
}

export default function DetailPage() {
  const [isBooking, setIsBooking] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { id } = useParams<{ id: string | undefined }>() // Lấy id từ URL

  // Lấy chi tiết travel
  const { data: travelDetail, isLoading: isLoadingTravel } = useQuery<Flight | Tour | CarRental | Hotel>({
    queryKey: ['travelDetail', id],
    queryFn: () => {
      if (id) {
        return travelApi.getTravelById(id)
      }
      throw new Error('ID is undefined')
    },
    enabled: !!id
  })

  // Lấy danh sách bình luận
  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: ['travelReviews', id],
    queryFn: () => {
      if (id) {
        return postApi.getReviewsOfPost(id)
      }
      throw new Error('ID is undefined')
    },
    enabled: !!id
  })

  const onBookingClick = () => {
    setIsBooking((prevState) => !prevState)
  }

  const onAddingToCart = () => {
    setIsAddingToCart((prevState) => !prevState)
  }

  if (isLoadingTravel || isLoadingComments) {
    return <div>Loading...</div>
  }

  if (!travelDetail) {
    return <div>Travel detail not found</div>
  }
  console.log(typeof comments)
  // Lấy 3 bình luận có mức rating cao nhất
  const topComments = comments?.data
    ?.sort((a: Comment, b: Comment) => b.rating - a.rating) // Sắp xếp giảm dần theo rating
    .slice(0, 3) // Lấy 3 bình luận đầu tiên
  return (
    <div className={`w-5/6 mx-auto mt-12 grid grid-cols-12 gap-4`}>
      <div className='col-span-9'>
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <header className='font-bold text-2xl'>{travelDetail.title}</header>
            <div className='col-span-3'>
              <button
                onClick={onBookingClick}
                className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold'
              >
                Book now
              </button>
              <button
                onClick={() => onAddingToCart}
                className='ml-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold'
              >
                Add To Cart
              </button>
            </div>
          </div>
          <div className='flex items-center mt-2'>
            <svg xmlns='http://www.w3.org/2000/svg' width='30px' height='30px' viewBox='0 0 24 24' fill='none'>
              <path
                d='M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <address className='ml-1'>{travelDetail.description}</address>
          </div>
          <img src={travelDetail.imageUrl[0]} alt='Detail' className='w-full h-auto mt-5' />
        </div>
      </div>
      <div className='col-span-3'>
        <h2 className='font-bold text-xl mb-4'>Top Reviews</h2>
        {topComments?.length ? (
          topComments.map((comment: Comment) => (
            <div key={comment.id} className='mb-4 p-4 border rounded shadow'>
              <p className='font-semibold flex items-center'>
                Rating:
                {/* Vẽ sao dựa trên rating */}
                {[...Array(comment.rating)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='#ffc107' // Màu vàng cho sao
                    className='w-4 h-4 ml-1'
                  >
                    <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                  </svg>
                ))}
              </p>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>

      <div className='col-span-9 break-words'>
        <TravelReview travelId={id ? id : ''} />
      </div>
      {isBooking ? <BookInformationForm onClick={onBookingClick} /> : ''}
      {isAddingToCart ? <BookingAddToCartForm onClick={onAddingToCart} /> : ''}
    </div>
  )
}
