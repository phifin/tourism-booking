import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import travelApi from '~/apis/travels.api'
import { InformationLongCard } from '~/components/InformationLongCard/InformationLongCard'
export default function PaymentPage() {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [bookingDetails, setBookingDetails] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const paymentBill = JSON.parse(localStorage.getItem('paymentbill') || '[]')
      const totalPrice = paymentBill.reduce((acc: number, item: { amount: number; price: number }) => {
        return acc + item.amount * item.price
      }, 0)

      const bookingDetailsWithTravel = await Promise.all(
        paymentBill.map(async (item: { travelId: string; [key: string]: any }) => {
          const travelDetails = await travelApi.getTravelById(item.travelId)
          return { ...item, travelDetails }
        })
      )

      setPrice(totalPrice)
      setBookingDetails(bookingDetailsWithTravel)
    }

    fetchBookingDetails()
  }, [])
  console.log(bookingDetails)

  const paymentOptions = [
    {
      id: 'vietqr',
      title: 'VietQR',
      description: 'Easy Payment with fast transaction',
      label: 'Discount',
      icon: 'VietQR'
    },
    {
      id: 'vietinbank',
      title: 'ViettinBank Online Banking',
      description: 'Easy payment and identifier',
      label: '',
      icon: 'VietinBank'
    },
    {
      id: 'other-wallets',
      title: 'Momo E-wallet',
      description: '',
      label: 'New',
      icon: 'ShopeePay, ZaloPay'
    }
  ]

  const handleSelectOption = (id: string) => {
    setSelectedOption(id)
  }

  const handleAcceptPayment = () => {
    navigate('/qrPayment')
  }

  return (
    <div className='flex flex-col p-6 font-sans w-4/5 mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-gray-800'>Payment Details</h1>

      <div className='mb-6'>
        {bookingDetails.map((detail, index) => (
          <div key={index} className='border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 shadow-md'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex flex-col'>
                <label className='text-gray-700 font-medium'>Full Name</label>
                <div className='border border-gray-300 rounded-md p-2 bg-white'>{detail.fullName}</div>
              </div>
              <div className='flex flex-col'>
                <label className='text-gray-700 font-medium'>Email</label>
                <div className='border border-gray-300 rounded-md p-2 bg-white'>{detail.email}</div>
              </div>
              <div className='flex flex-col'>
                <label className='text-gray-700 font-medium'>Phone Number</label>
                <div className='border border-gray-300 rounded-md p-2 bg-white'>{detail.phoneNumber}</div>
              </div>
              <div className='flex flex-col'>
                <label className='text-gray-700 font-medium'>Booking Date</label>
                <div className='border border-gray-300 rounded-md p-2 bg-white'>
                  {new Date(detail.bookedDate).toLocaleDateString()}
                </div>
              </div>
              <div className='flex flex-col'>
                <label className='text-gray-700 font-medium'>Number of People</label>
                <div className='border border-gray-300 rounded-md p-2 bg-white'>{detail.amount}</div>
              </div>
              <div className='flex flex-col'>
                <label className='text-gray-700 font-medium'>Number of Nights</label>
                <div className='border border-gray-300 rounded-md p-2 bg-white'>{detail.nights}</div>
              </div>
              <div className='flex flex-col'>
                <label className='text-gray-700 font-medium'>Price per Person</label>
                <div className='border border-gray-300 rounded-md p-2 bg-white'>${detail.price}</div>
              </div>
            </div>
            <InformationLongCard travelData={bookingDetails[0].travelDetails} />
          </div>
        ))}
      </div>

      <h2 className='text-xl font-semibold text-green-600 mb-4'>Total Amount: {price.toLocaleString()} USD</h2>

      <div className='mt-4'>
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelectOption(option.id)}
            className={`border rounded-lg p-4 mb-4 cursor-pointer shadow-md transition-all duration-300 ${
              selectedOption === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
            }`}
          >
            {option.label && (
              <span className='inline-block bg-green-100 text-green-600 px-2 py-1 rounded text-xs mb-2'>
                {option.label}
              </span>
            )}
            <h3 className='text-lg font-medium text-gray-800 mb-1'>{option.title}</h3>
            {option.description && <p className='text-sm text-gray-600'>{option.description}</p>}
          </div>
        ))}
      </div>

      <button
        onClick={handleAcceptPayment}
        disabled={!selectedOption}
        className={`w-1/3 self-end mt-6 py-2 px-4 rounded-lg font-bold text-white transition-all duration-300 ${
          selectedOption ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Confirm Payment
      </button>
    </div>
  )
}
