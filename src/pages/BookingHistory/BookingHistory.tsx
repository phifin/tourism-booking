import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import bookingApi from '~/apis/booking.api'
import userDataApi from '~/apis/userData.api'
import { AppContext } from '~/context/app.context'

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
  const travelIds = bookingData?.map((booking) => booking.travelId) || []
  console.log(travelIds)

  // Render loading trạng thái nếu booking data chưa được load
  if (isBookingLoading) {
    return <div>Loading booking history...</div>
  }

  // Nếu không có userId, hiển thị lỗi
  if (!userId) {
    return <div>No user found!</div>
  }

  // Render dữ liệu booking
  return (
    <div className='w-3/4 mx-auto mt-10'>
      <div>
        <header className='text-3xl font-bold '>Your Flights</header>
      </div>
      <div>
        <header className='text-3xl font-bold '>Your Stays</header>
      </div>
      <div>
        <header className='text-3xl font-bold '>Your Tour</header>
      </div>
      <div>
        <header className='text-3xl font-bold '>Your Car Rental</header>
      </div>
      <div>
        <pre>{JSON.stringify(bookingData, null, 2)}</pre> {/* Hiển thị mảng travelIds */}
      </div>
    </div>
  )
}
