import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Tour, Hotel, Flight, CarRental } from '~/models/travels.model'
import travelApi from '~/apis/travels.api'

interface BookAddingToCartProps {
  onClick: () => void
}

interface CartItemFromLS {
  id: string | undefined
  amount: number
  price: number | undefined
  bookDate: string
}

export default function BookingAddToCartForm({ onClick }: BookAddingToCartProps) {
  const [bookingDate, setBookingDate] = useState<dayjs.Dayjs | null>(dayjs())
  const [peopleAmount, setPeopleAmount] = useState(0)
  const { id } = useParams<{ id: string | undefined }>()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value) // Chuyển đổi giá trị từ string sang number
    setPeopleAmount(value)
    // console.log(value)
  }
  const formatDate = (date: dayjs.Dayjs | null) => {
    return date ? date.format('DD-MM-YYYY') : ''
  }

  const { data: travelDetail } = useQuery<Flight | Tour | CarRental | Hotel>({
    queryKey: ['travelDetail', id],
    queryFn: () => {
      if (id) {
        return travelApi.getTravelById(id)
      }
      throw new Error('ID is undefined') // Xử lý trường hợp id bị undefined
    },
    enabled: !!id // Chỉ thực hiện query nếu id tồn tại
  })

  const addToCard = (travelDetail: Flight | Tour | CarRental | Hotel | undefined) => {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : []

    // Kiểm tra xem sản phẩm có id và bookDate giống nhau đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(
      (item: CartItemFromLS) => item.id === travelDetail?.id && item.bookDate === formatDate(bookingDate)
    )

    if (existingProductIndex !== -1) {
      // Nếu sản phẩm có id và bookDate trùng khớp, tăng số lượng (amount)
      cart[existingProductIndex].amount += peopleAmount
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng với số lượng ban đầu là peopleAmount
      const newOrder: CartItemFromLS = {
        id: travelDetail?.id || '',
        amount: peopleAmount,
        price: travelDetail?.price || 0,
        bookDate: formatDate(bookingDate)
      }
      cart.push(newOrder)
    }

    // Lưu giỏ hàng đã cập nhật vào LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart))
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

      <button
        onClick={() => addToCard(travelDetail)}
        className='flex items-center justify-center mt-3 mb-3 h-12 mx-auto bg-blue-600 hover:bg-blue-700 text-white border w-95/100 border-gray-400 rounded-xl font-semibold cursor-pointer'
      >
        Add to Cart
      </button>
    </div>
  )
}
