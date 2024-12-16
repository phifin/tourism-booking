import { useContext, useEffect } from 'react'
import { AppContext } from '~/context/app.context'
import { useQuery } from '@tanstack/react-query'
// import userDataApi from '~/apis/userData.api'
import { userApi } from '~/apis/user.api'
import bookingApi from '~/apis/booking.api'
import BookingCard from '~/components/BookingCard/BookingCard'
import { AppDispatch, RootState } from '~/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookingsByUserId } from '~/store/booking.slice'
import { BookingModel } from '~/models/booking.model'

export default function BookingHistory() {
  // const { userEmail } = useContext(AppContext)

  // // Fetch user data
  // const { data: userData } = useQuery(['userData', userEmail], () => userApi.fetchUserByEmail(userEmail))
  // const userId = userData?.id || ''

  // // Fetch booking data - sử dụng enabled để chỉ thực thi khi userId đã có giá trị
  // const { data: bookingData, isLoading: isBookingLoading } = useQuery({
  //   queryKey: ['bookings', userId],
  //   queryFn: () => bookingApi.getAllBookingsByUserId(userId),
  //   enabled: !!userId // Chỉ thực thi query khi userId có giá trị
  // })

  // // Lấy tất cả travelId từ dữ liệu booking trả về
  // const response: Booking[] =
  //   bookingData?.map((booking) => ({
  //     travelId: booking.travelId,
  //     bookDate: booking.bookedDate
  //   })) || []

  // // Render loading trạng thái nếu booking data chưa được load
  // if (isBookingLoading) {
  //   return <div>Loading booking history...</div>
  // }

  // // Nếu không có userId, hiển thị lỗi
  // if (!userId) {
  //   return <div>No user found!</div>
  // }

  const dispatch: AppDispatch = useDispatch()
  const { bookings, isLoading, error } = useSelector((state: RootState) => state.bookings)
  const userRedux = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(fetchBookingsByUserId(userRedux.data!.id))
  }, [dispatch])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

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
