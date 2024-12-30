import BookingCartCard from '~/components/BookingCartCard'

interface CartItemFromLS {
  id: string | undefined
  amount: number
  price: number
}
export default function BookingCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  // Hàm lấy dữ liệu từ localStorage và fetch booking từ API
  console.log(cart.length)
  // Hàm render BookingCard
  const renderBookingCards = () => {
    if (!cart) {
      return <div>No bookings found!</div>
    }

    return cart.map((item: CartItemFromLS) => (
      <BookingCartCard
        key={item.id}
        travelId={item.id || ''}
        amount={item.amount} // amount từ localStorage
      />
    ))
  }

  const totalCartValue = cart.reduce((totalCartValue: number, item: CartItemFromLS) => {
    console.log(item)
    return totalCartValue + item.price * item.amount
  }, 0)

  // Render dữ liệu booking
  return (
    <div className='w-3/4 mx-auto mt-10'>
      <header className='text-3xl font-bold mb-5'>Your Bookings</header>
      <div>{renderBookingCards()}</div>
      {cart.length !== 0 ? (
        <div className='mt-5 text-2xl'>Total value: {totalCartValue}</div>
      ) : (
        <p className='text-lg'>You do not have any booking carts</p>
      )}
    </div>
  )
}
