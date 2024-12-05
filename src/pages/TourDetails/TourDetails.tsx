import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import userDataApi from '~/apis/userData.api'
import travelApi from '~/apis/travels.api'
import bookingApi from '~/apis/booking.api' // API để tạo booking
import { Attraction, CarRental, Flight, Stay } from '~/types/travels.type'
import { useContext } from 'react'
import { AppContext } from '~/context/app.context' // Giả sử bạn đã lưu thông tin user trong context

export default function DetailPage() {
  const { id } = useParams<{ id: string | undefined }>() // Lấy id từ URL
  const { userEmail } = useContext(AppContext)
  const { data: userData } = useQuery(['userData', userEmail], () => userDataApi.getUserData(userEmail), {})
  const userId = userData?.data._id // Lấy userId từ context

  // Sử dụng React Query để lấy dữ liệu, kiểm tra `id` trước khi gọi API
  const { data: travelDetail, isLoading } = useQuery<Flight | Attraction | CarRental | Stay>({
    queryKey: ['travelDetail', id],
    queryFn: () => {
      if (id) {
        return travelApi.getTravelById(id)
      }
      throw new Error('ID is undefined') // Xử lý trường hợp id bị undefined
    },
    enabled: !!id // Chỉ thực hiện query nếu id tồn tại
  })

  // Mutation để gọi POST request tạo booking
  const { mutate: createBooking, isLoading: isBookingLoading } = useMutation({
    mutationFn: async (bookingData: { userId: string; travelId: string; bookedDate: string; amount: number }) => {
      return bookingApi.createNewBooking(
        bookingData.userId,
        bookingData.travelId,
        bookingData.bookedDate,
        bookingData.amount
      ) // Gọi API để tạo booking
    },
    onSuccess: () => {
      // Xử lý khi tạo booking thành công, ví dụ như thông báo thành công hoặc chuyển hướng
      alert('Booking successfully created!')
    }
  })

  // Hàm để tạo booking khi nút được nhấn
  const handleCreateBooking = () => {
    if (!userId || !id) {
      alert('User or Travel ID is missing!')
      return
    }

    const bookingData = {
      userId,
      travelId: id,
      bookedDate: new Date().toISOString(), // Lấy thời gian hiện tại
      amount: 1 // Giả sử giá trị amount là 1
    }

    createBooking(bookingData) // Gọi hàm mutate để tạo booking
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!travelDetail) {
    return <div>Travel detail not found</div>
  }

  return (
    <div className='w-5/6 mx-auto mt-12 grid grid-cols-12 gap-2'>
      <div className='col-span-9'>
        <div>
          <header className='font-bold text-2xl'>{travelDetail.title}</header>
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
            <address className='ml-1'>
              {'city' in travelDetail
                ? travelDetail.city
                : 'destination' in travelDetail
                  ? travelDetail.destination
                  : travelDetail.location || 'Unknown'}
            </address>
          </div>
          <img src={travelDetail.imageUrl[0]} alt='Detail' className='mt-5' />
        </div>
      </div>
      <div className='h-44 col-span-3 border border-slate-500 border-opacity-50'>
        <p>{travelDetail.description}</p>
        <button
          onClick={handleCreateBooking}
          disabled={isBookingLoading}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
        >
          {isBookingLoading ? 'Booking...' : 'Book Now'}
        </button>
      </div>
    </div>
  )
}
