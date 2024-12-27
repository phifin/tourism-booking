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
  }, [dispatch])

  if (isLoading || userRedux.loading) return <div>Loading...</div>
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
