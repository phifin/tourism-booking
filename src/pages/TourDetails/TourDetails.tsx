import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
// import userDataApi from '~/apis/userData.api'
import travelApi from '~/apis/travels.api'
// import { Attraction, CarRental, Flight, Stay } from '~/types/travels.type'
import { Tour, Hotel, Flight, CarRental } from '~/models/travels.model'
import { useState } from 'react'
import BookInformationForm from '~/components/BookInformationForm'
import BookingAddToCartForm from '~/components/BookingAddToCartForm'
import TravelReview from '~/components/TravelReview'

// interface CartItemFromLS {
//   id: string | undefined
//   amount: number
//   price: number
//   bookDate: Date
// }

export default function DetailPage() {
  const [isBooking, setIsBooking] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { id } = useParams<{ id: string | undefined }>() // Lấy id từ URL

  // Sử dụng React Query để lấy dữ liệu, kiểm tra `id` trước khi gọi API
  const { data: travelDetail, isLoading } = useQuery<Flight | Tour | CarRental | Hotel>({
    queryKey: ['travelDetail', id],
    queryFn: () => {
      if (id) {
        return travelApi.getTravelById(id)
      }
      throw new Error('ID is undefined') // Xử lý trường hợp id bị undefined
    },
    enabled: !!id // Chỉ thực hiện query nếu id tồn tại
  })

  const onBookingClick = () => {
    setIsBooking((prevState: boolean) => !prevState)
  }

  const onAddingToCart = () => {
    setIsAddingToCart((prevState: boolean) => !prevState)
  }

  // Mutation để gọi POST request tạo booking

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!travelDetail) {
    return <div>Travel detail not found</div>
  }

  // const addToCard = (travelDetail: TravelModel) => {
  //   const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : []

  //   // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  //   const existingProductIndex = cart.findIndex((item: CartItemFromLS) => item.id === travelDetail.id)

  //   if (existingProductIndex !== -1) {
  //     // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
  //     cart[existingProductIndex].amount += 1
  //   } else {
  //     // Nếu sản phẩm chưa có, thêm sản phẩm vào giỏ hàng với số lượng 1
  //     const newOrder: CartItemFromLS = {
  //       id,
  //       amount: 1,
  //       price: travelDetail.price
  //     }
  //     cart.push(newOrder)
  //   }

  //   // Lưu giỏ hàng đã cập nhật vào LocalStorage
  //   localStorage.setItem('cart', JSON.stringify(cart))
  // }
  return (
    <div className={`w-5/6 mx-auto mt-12 grid grid-cols-12 gap-2 }`}>
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
      <div className='h-44 col-span-3 '>
        <header className='text-xl font-bold'>Description</header>
        <p className='mt-2'>{travelDetail.description}</p>
        <div>
          <button onClick={onBookingClick} className='mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded'>
            Book now
          </button>
          <button
            className='mt-4 ml-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded'
            onClick={onAddingToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <div className='col-span-9 break-words'>
        <TravelReview travelId={id ? id : ''} />
      </div>
      {isBooking ? <BookInformationForm onClick={onBookingClick} /> : ''}
      {isAddingToCart ? <BookingAddToCartForm onClick={onAddingToCart} /> : ''}
    </div>
  )
}
