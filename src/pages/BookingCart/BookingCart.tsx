import { Link, useNavigate } from 'react-router-dom'
import BookingCartCard from '~/components/BookingCartCard'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

interface CartItemFromLS {
  id: string | undefined
  amount: number
  price: number
  bookDate: string
  fullName: string
  email: string | undefined
  phoneNumber: string
  nights: number
}

export default function BookingCart() {
  const userData = useSelector((state: RootState) => state.user)
  const [cart, setCart] = useState<CartItemFromLS[]>(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const navigate = useNavigate()

  const handleDelete = (travelId: string | undefined, bookDate: string | undefined) => {
    if (!travelId || !bookDate) return

    const updatedCart = cart.filter((item) => !(item.id === travelId && item.bookDate === bookDate))

    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const onAdd = (id: string | undefined, bookDate: string | undefined) => {
    if (!id) return

    const updatedCart = cart.map((item) => {
      if (item.id === id && item.bookDate === bookDate) {
        return { ...item, amount: item.amount + 1 }
      }
      return item
    })

    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const onMinus = (id: string | undefined, bookDate: string | undefined) => {
    if (!id) return

    const updatedCart = cart.map((item) => {
      if (item.id === id && item.bookDate === bookDate && item.amount > 1) {
        return { ...item, amount: item.amount - 1 }
      }
      return item
    })

    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const renderBookingCards = () => {
    if (!cart) {
      return <div>No bookings found!</div>
    }

    return cart.map((item: CartItemFromLS) => (
      <BookingCartCard
        key={item.id}
        travelId={item.id || ''}
        amount={item.amount}
        onDrop={() => handleDelete(item.id, item.bookDate)}
        onAdd={() => onAdd(item.id, item.bookDate)}
        onMinus={() => onMinus(item.id, item.bookDate)}
        bookDate={item.bookDate}
      />
    ))
  }

  const totalCartValue = cart.reduce((totalCartValue: number, item: CartItemFromLS) => {
    console.log(item)
    return totalCartValue + item.price * item.amount
  }, 0)

  const handleProceedToPayment = () => {
    const paymentBill = cart.map((item) => ({
      travelId: item.id,
      userId: userData.data?.id,
      bookedDate: item.bookDate,
      amount: item.amount,
      nights: item.nights,
      fullName: item.fullName,
      email: item.email,
      phoneNumber: item.phoneNumber,
      price: item.price
    }))

    localStorage.setItem('paymentbill', JSON.stringify(paymentBill))
    navigate('/paymentPage')
  }

  return (
    <div className='w-3/4 mx-auto mt-10 pb-20'>
      <div className='flex flex-col'>
        <header className='text-3xl font-bold'>Your Orders</header>
        <div>{renderBookingCards()}</div>
        {cart.length !== 0 ? (
          <div className='mt-5 w-1/2 text-xl border-2 border-gray-200 self-end rounded-xl pb-4'>
            <div className='mt-4 flex justify-between items-center'>
              <div className='ml-4'>Subtotal </div> <div className='mr-4'>{totalCartValue}</div>
            </div>
            <div className='mt-4 flex justify-between items-center'>
              <div className='ml-4'>Tax </div> <div className='mr-4'>{(totalCartValue * 10) / 100}</div>
            </div>
            <div className='mt-4 flex justify-between items-center border-t w-95/100 mx-auto font-semibold'>
              <div className='ml-1 mt-3'>Total </div>{' '}
              <div className='mr-1'>{totalCartValue + (totalCartValue * 10) / 100}</div>
            </div>
            <form className='flex justify-between mt-4 w-95/100 mx-auto border border-slate-200 rounded-lg overflow-hidden'>
              <input
                type='text'
                placeholder='Enter your voucher...'
                className='ml-2 w-3/4 focus:border-none focus:outline-none'
              />
              <button className='py-2 px-2 bg-blue-700 hover:bg-blue-800 text-white w-1/4'>Apply</button>
            </form>
            <div
              onClick={handleProceedToPayment}
              className='w-95/100 mx-auto py-2 bg-blue-500 hover:bg-blue-600 mt-6 rounded-lg text-white cursor-pointer'
            >
              <header className='text-center'>Proceed to Payment</header>
            </div>
            <div className='text-sm text-slate-400 text-center mt-3'>or</div>
            <div className='flex items-center justify-center'>
              <Link to='/tour' className='text-blue-600 mt-2 underline'>
                Continue to order
              </Link>
            </div>
          </div>
        ) : (
          <p className='text-lg'>You do not have any booking carts</p>
        )}
      </div>
    </div>
  )
}
