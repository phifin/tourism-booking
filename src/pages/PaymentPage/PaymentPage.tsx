import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PaymentPage() {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    const paymentBill = JSON.parse(localStorage.getItem('paymentbill') || '[]')
    const totalPrice = paymentBill.reduce((acc: number, item: { amount: number; price: number }) => {
      return acc + item.amount * item.price
    }, 0)
    setPrice(totalPrice)
  }, [])

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        width: '60%',
        margin: 'auto'
      }}
    >
      <h1>Thanh toán</h1>
      <p>Số tiền: {price.toLocaleString()} VNĐ</p>

      <div style={{ marginTop: '20px' }}>
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelectOption(option.id)}
            style={{
              border: selectedOption === option.id ? '2px solid blue' : '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '10px',
              cursor: 'pointer'
            }}
          >
            {option.label && (
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#d1f7d6',
                  color: '#4caf50',
                  padding: '2px 5px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  marginBottom: '5px'
                }}
              >
                {option.label}
              </span>
            )}
            <h3 style={{ margin: '5px 0' }}>{option.title}</h3>
            {option.description && <p style={{ fontSize: '14px', color: '#666' }}>{option.description}</p>}
          </div>
        ))}
      </div>

      <button
        onClick={handleAcceptPayment}
        disabled={!selectedOption}
        style={{
          width: '30%',
          alignSelf: 'end',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: selectedOption ? 'blue' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontWeight: 'bold',
          cursor: selectedOption ? 'pointer' : 'not-allowed'
        }}
      >
        Xác nhận thanh toán
      </button>
    </div>
  )
}
