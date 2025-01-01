import { useNavigate } from 'react-router-dom'
import bookingApi from '~/apis/booking.api'

export default function QrPayment() {
  const navigate = useNavigate()
  const handleCompletePayment = async () => {
    const paymentBill = JSON.parse(localStorage.getItem('paymentbill') || '[]')
    console.log(paymentBill)
    for (const item of paymentBill) {
      const { userId, travelId, bookedDate, amount } = item
      try {
        await bookingApi.createNewBooking(userId, travelId, bookedDate, amount)
        console.log('+1 fetch')
      } catch (error) {
        console.error(`Failed to create booking for travelId: ${travelId}`, error)
      }
    }

    // Clear payment bill after completing payment
    localStorage.removeItem('paymentbill')
    navigate('/bookinghistory')
  }

  return (
    <div className='flex flex-col w-1/4 h-1/4 object-contain mx-auto mt-10 pb-16'>
      <img src='/src/assets/qrcodepayment.jpg' alt='qr-momo' />
      <div
        className='self-end mt-5 px-2 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg w-fit'
        onClick={handleCompletePayment}
      >
        <div className='cursor-pointer'>Complete Payment</div>
      </div>
    </div>
  )
}
