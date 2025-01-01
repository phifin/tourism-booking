import React from 'react'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '~/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookingsByUserId } from '~/store/booking.slice'
import { BookingModel } from '~/models/booking.model'
import MyBookingCard from '~/components/MyBookingCard'

function BookingHistory() {
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

    return bookings.map((book: BookingModel) => <MyBookingCard key={book.id} bookData={book} />)
  }

  // Render dữ liệu booking
  return (
    <div>
      <header className='text-xl font-bold mb-5'>Booking List</header>
      <div>{renderBookingCards()}</div>
    </div>
  )
}

const MyBooking: React.FC = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>My Bookings</h1>
      <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg border rounded-md'>
        <h1 className='text-xl font-bold mb-4'>{BookingHistory()}</h1>
      </div>
    </div>
  )
}

export default MyBooking
