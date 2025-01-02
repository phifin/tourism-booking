import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import travelApi from '~/apis/travels.api'
import { Flight, Tour, Hotel, CarRental } from '~/models/travels.model'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
// import { useNavigate } from 'react-router-dom'

interface BookAddingToCartProps {
  onClick: () => void
}

interface CartItemFromLS {
  id: string | undefined
  amount: number
  price: number | undefined
  bookDate: string
  fullName: string
  email: string | undefined
  phoneNumber: string
  nights: number
}

export default function BookingAddToCartForm({ onClick }: BookAddingToCartProps) {
  const userRedux = useSelector((state: RootState) => state.user)
  const { id } = useParams<{ id: string | undefined }>()
  const [bookingDate, setBookingDate] = useState<dayjs.Dayjs | null>(dayjs())
  const [peopleAmount, setPeopleAmount] = useState(1)
  const [fullName, setFullName] = useState(userRedux.data?.lastName + ' ' + userRedux.data?.firstName)
  const [email, setEmail] = useState(userRedux.data?.email)
  const [phoneNumber, setPhoneNumber] = useState(
    userRedux.data?.phoneNumber ? userRedux.data?.phoneNumber : '0913242142'
  )
  const [nights, setNights] = useState(1)
  // const navigate = useNavigate()

  const formatDate = (date: dayjs.Dayjs | null) => {
    return date ? date.format('DD-MM-YYYY') : ''
  }

  const { data: travelDetail } = useQuery<Flight | Tour | CarRental | Hotel>({
    queryKey: ['travelDetail', id],
    queryFn: () => {
      if (id) {
        return travelApi.getTravelById(id)
      }
      throw new Error('ID is undefined')
    },
    enabled: !!id
  })

  const addToCart = (travelDetail: Flight | Tour | CarRental | Hotel | undefined) => {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : []

    const existingProductIndex = cart.findIndex(
      (item: CartItemFromLS) => item.id === travelDetail?.id && item.bookDate === formatDate(bookingDate)
    )

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].amount += peopleAmount
    } else {
      const newOrder: CartItemFromLS = {
        id: travelDetail?.id || '',
        amount: peopleAmount,
        price: travelDetail?.price || 0,
        bookDate: formatDate(bookingDate),
        fullName,
        email,
        phoneNumber,
        nights
      }
      cart.push(newOrder)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    onClick()
  }

  // const handleCreateBooking = () => {
  //   if (!id) {
  //     alert('Travel ID is missing!')
  //     return
  //   }

  //   if (!fullName || !email || !phoneNumber) {
  //     alert('Please fill in all the required fields!')
  //     return
  //   }

  //   const bookingData = [
  //     {
  //       userId: userRedux.data?.id,
  //       travelId: id,
  //       bookedDate: bookingDate ? bookingDate.toISOString() : dayjs().toISOString(),
  //       amount: peopleAmount,
  //       price: travelDetail?.price || 0,
  //       fullName,
  //       email,
  //       phoneNumber,
  //       nights
  //     }
  //   ]

  //   localStorage.setItem('paymentbill', JSON.stringify(bookingData))

  //   navigate('/paymentPage')
  //   onClick()
  // }

  return (
    <div
      className={`fixed justify-center top-36 left-95 z-50 
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
      <div className='flex flex-col gap-4 mt-7 px-4'>
        <div className='flex items-center'>
          <header className='w-1/3 text-xl'>Full Name:</header>
          <input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className='flex-1 h-10 border rounded px-2'
            placeholder='Enter your full name'
          />
        </div>
        <div className='flex items-center'>
          <header className='w-1/3 text-xl'>Email:</header>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='flex-1 h-10 border rounded px-2'
            placeholder='Enter your email'
          />
        </div>
        <div className='flex items-center'>
          <header className='w-1/3 text-xl'>Phone Number:</header>
          <input
            type='tel'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className='flex-1 h-10 border rounded px-2'
            placeholder='Enter your phone number'
          />
        </div>
        <div className='flex items-center'>
          <header className='w-1/3 text-xl'>Number of People:</header>
          <input
            type='number'
            value={peopleAmount}
            min='0'
            onChange={(e) => setPeopleAmount(Number(e.target.value))}
            className='flex-1 h-10 border rounded px-2'
          />
        </div>
        <div className='flex items-center'>
          <header className='w-1/3 text-xl'>Number of Nights:</header>
          <input
            type='number'
            value={nights}
            min='1'
            onChange={(e) => setNights(Number(e.target.value))}
            className='flex-1 h-10 border rounded px-2'
          />
        </div>
        <div className='flex items-center'>
          <header className='w-1/3 text-xl'>Travel Date:</header>
          <DatePicker value={bookingDate} onChange={(newValue) => setBookingDate(newValue)} />
        </div>
        <div className='flex items-center'>
          <header className='w-1/3 text-xl'>Price per Person:</header>
          <div>{travelDetail?.price ? `$${travelDetail.price}` : 'Loading...'}</div>
        </div>
      </div>

      <button
        onClick={() => addToCart(travelDetail)}
        className='flex items-center justify-center mt-6 mb-3 h-12 mx-auto bg-blue-600 hover:bg-blue-700 text-white border w-95/100 border-gray-400 rounded-xl font-semibold cursor-pointer'
      >
        Add to Cart
      </button>
    </div>
  )
}
