import { useNavigate } from 'react-router-dom'

interface InformationProps {
  id: string
  title: string
  place: string
  imgUrl: string
  price: number
  ratings: number
}

export default function InformationCard({ id, title, place, imgUrl, ratings, price }: InformationProps) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/travel/${id}`) // Chuyển hướng đến URL chi tiết
  }
  return (
    <div
      onClick={handleCardClick}
      className='h-96 w-full col-span-3 shadow-2xl my-10 mx-auto rounded-xl overflow-hidden cursor-pointer'
    >
      <img src={imgUrl} className='h-3/5 w-full' />
      <header className='mt-3 ml-2'>{title}</header>
      <div className='mt-1 ml-2'>{place}</div>
      <div
        className={`px-2 py-1 mr-2 rounded-lg border-1 ml-3 mt-2 w-6
    ${ratings >= 3 ? 'bg-green-600' : ratings < 2 ? 'bg-red-600' : 'bg-yellow-500'} 
    text-white`}
      >
        {ratings}
      </div>
      <div className='mt-1 ml-2 font-semibold text-blue-700'>${price}.00</div>
    </div>
  )
}
