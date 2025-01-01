import { useEffect } from 'react'
import BookingCard from '~/components/BookingCard/BookingCard'
import { AppDispatch, RootState } from '~/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookingsByUserId } from '~/store/booking.slice'
import { BookingModel } from '~/models/booking.model'

export default function BookingHistory() {
  const dispatch: AppDispatch = useDispatch()
  const { bookings, isLoading, error } = useSelector((state: RootState) => state.bookings)
  const userRedux = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (userRedux.data) {
      dispatch(fetchBookingsByUserId(userRedux.data!.id))
    }
  }, [dispatch, userRedux.data])

  // Shimmer skeleton for loading state
  const renderShimmer = () => {
    return (
      <div className='w-3/4 mx-auto mt-10'>
        <header className='text-3xl font-bold mb-5'>Your Bookings</header>
        <div className='space-y-4'>
          {[1, 2, 3].map((index) => (
            <div key={index} className='flex h-44 w-full shadow-lg rounded-xl overflow-hidden animate-pulse'>
              <div className='w-1/4 flex-shrink-0 bg-gray-300'></div>
              <div className='w-3/4 p-3'>
                <div className='h-6 bg-gray-300 rounded mb-4 w-1/2'></div>
                <div className='h-4 bg-gray-300 rounded mb-3 w-3/4'></div>
                <div className='h-4 bg-gray-300 rounded mb-3 w-1/3'></div>
                <div className='h-4 bg-gray-300 rounded mb-3 w-1/4'></div>
                <div className='h-6 bg-gray-300 rounded w-1/4 mt-3 ml-auto'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isLoading || userRedux.loading) return renderShimmer()
  if (error || userRedux.error) return <div>Error: {error}</div>

  // Hàm render BookingCard
  const renderBookingCards = () => {
    if (bookings === null || bookings.length === 0) {
      return <div>No bookings found!</div>
    }

    return bookings.map((book: BookingModel) => (
      <BookingCard key={book.travelId} travelId={book.travelId} bookDate={book.bookedDate} />
    ))
  }

  // Render dữ liệu booking
  return (
    <div className='w-3/4 mx-auto mt-10'>
      <header className='text-3xl font-bold mb-5'>Your Bookings</header>
      <div>{renderBookingCards()}</div>
    </div>
  )
}
