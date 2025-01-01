import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
// import bookingApi from '~/apis/booking.api' // Import API module
import travelApi from '~/apis/travels.api'

interface BookInformationFormProps {
  onClick: () => void
}

export default function BookInformationForm({ onClick }: BookInformationFormProps) {
  const { id } = useParams<{ id: string | undefined }>() // Lấy id từ URL
  const [bookingDate, setBookingDate] = useState<dayjs.Dayjs | null>(dayjs())
  const [peopleAmount, setPeopleAmount] = useState(0)
  const [price, setPrice] = useState<number | null>(null)
  const userRedux = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (id) {
      travelApi
        .getTravelById(id)
        .then((data) => {
          setPrice(data.price) // Gán giá trị price từ API response
        })
        .catch((error) => {
          console.error('Error fetching travel details:', error)
        })
    }
  }, [id])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value) // Chuyển đổi giá trị từ string sang number
    setPeopleAmount(value)
  }

  // Hàm để lưu booking vào localStorage
  const handleCreateBooking = () => {
    if (!id) {
      alert('Travel ID is missing!')
      return
    }

    const bookingData = [
      {
        userId: userRedux.data?.id,
        travelId: id,
        bookedDate: bookingDate ? bookingDate.toISOString() : dayjs().toISOString(), // Lấy thời gian hiện tại
        amount: peopleAmount, // Giả sử giá trị amount là 1
        price: price // Thêm giá trị price
      }
    ]

    localStorage.setItem('paymentbill', JSON.stringify(bookingData))

    navigate('/paymentPage')
    onClick()
  }

  return (
    <div
      className={`fixed justify-center top-40 left-95 z-50 
             w-1/2 border-gray-700 shadow-2xl bg-slate-50 rounded-xl`}
    >
      <div className='py-4 h-1/6 w-95/100 mx-auto flex justify-center items-center border-b font-bold text-xl border-gray-300 relative'>
        <header>Enter your booking information</header>
        <div
          className='absolute right-4 ml-32 p-4 h-5 w-5 flex justify-center items-center text-gray-500 hover:bg-gray-300 font-light text-sm bg-gray-200 rounded-full cursor-pointer'
          onClick={onClick}
        >
          X
        </div>
      </div>
      <div className='flex items-center mt-7'>
        <header className='mx-4 text-xl'>Number of people</header>
        <input type='number' value={peopleAmount} min='0' className='h-10' onChange={handleInputChange} />
      </div>
      <div className='flex items-center mt-7'>
        <header className='mx-4 text-xl'>Select the date you want to travel</header>
        <DatePicker value={bookingDate} onChange={(newValue) => setBookingDate(newValue)} />
      </div>
      <div className='flex items-center mt-7'>
        <header className='mx-4 text-xl'>Price per person:</header>
        <div>{price !== null ? `$${price}` : 'Loading...'}</div>
      </div>

      <button
        onClick={handleCreateBooking}
        className='flex items-center justify-center mt-3 mb-3 h-12 mx-auto bg-blue-600 hover:bg-blue-700 text-white border w-95/100 border-gray-400 rounded-xl font-semibold cursor-pointer'
      >
        Book
      </button>
    </div>
  )
}
