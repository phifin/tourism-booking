import { useContext } from 'react'
import { AppContext } from '~/context/app.context'
import { useQuery } from '@tanstack/react-query'
import userDataApi from '~/apis/userData.api'
import bookingApi from '~/apis/booking.api'
import BookingCard from '~/components/BookingCard/BookingCard'

interface Booking {
  travelId: string
  bookDate: Date
}

export default function BookingHistory() {
  const { userEmail } = useContext(AppContext)

  // Fetch user data
  const { data: userData } = useQuery(['userData', userEmail], () => userDataApi.getUserData(userEmail))
  const userId = userData?.data._id || ''

  // Fetch booking data - sử dụng enabled để chỉ thực thi khi userId đã có giá trị
  const { data: bookingData, isLoading: isBookingLoading } = useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => bookingApi.getAllBookings(userId),
    enabled: !!userId // Chỉ thực thi query khi userId có giá trị
  })

  // Lấy tất cả travelId từ dữ liệu booking trả về
  const response: Booking[] =
    bookingData?.map((booking) => ({
      travelId: booking.travelId,
      bookDate: booking.bookedDate
    })) || []

  // Render loading trạng thái nếu booking data chưa được load
  if (isBookingLoading) {
    return <div>Loading booking history...</div>
  }

  // Nếu không có userId, hiển thị lỗi
  if (!userId) {
    return <div>No user found!</div>
  }

  // Hàm render BookingCard
  const renderBookingCards = () => {
    if (response.length === 0) {
      return <div>No bookings found!</div>
    }

    return response.map((book: Booking) => (
      <BookingCard key={book.travelId} travelId={book.travelId} bookDate={book.bookDate} />
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
