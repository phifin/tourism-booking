import { useNavigate } from 'react-router-dom'

interface Props {
  id: string // Thêm id để xác định thẻ
  image: string
  title: string
  location: string
  description: string
  ratings: number
  price: number
  height: string // New prop for controlling the container height
}

export default function InformationLongCard({
  id,
  image,
  title,
  ratings,
  price,
  location,
  description,
  height
}: Props) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/travel/${id}`) // Chuyển hướng đến URL chi tiết
  }

  return (
    <div
      onClick={handleCardClick} // Gọi hàm điều hướng khi nhấn vào thẻ
      className={`flex ${height} w-full shadow-lg my-10 mx-auto rounded-xl overflow-hidden cursor-pointer`}
    >
      <div className='w-1/4 flex-shrink-0'>
        <img src={image} className='w-full h-full object-cover' alt={title}></img>
      </div>
      <div className='w-3/4'>
        <div className='ml-3 mt-3 text-2xl font-bold'>{title}</div>
        <div className='ml-3 mt-4 w-full pr-6 line-clamp-2'>{description}</div>
        <div className='ml-3 mt-3'>{location}</div>
        <div className='flex mt-3 ml-3'>
          <div className='w-52'>
            <span
              className={`px-2 py-1 mr-2 rounded-lg border-1 
    ${ratings >= 3 ? 'bg-green-600' : ratings < 2 ? 'bg-red-600' : 'bg-yellow-500'} 
    text-white`}
            >
              {ratings}
            </span>
            <span>{ratings >= 4 ? 'Excellent' : ratings >= 3 ? 'Very Good' : ratings >= 2.5 ? 'Good' : 'Bad'}</span>
          </div>

          <div className='ml-96 w-52 text-xl font-bold text-blue-900'>${price}.00 USD</div>
        </div>
      </div>
    </div>
  )
}
