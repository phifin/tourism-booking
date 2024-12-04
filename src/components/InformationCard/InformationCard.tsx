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
      <div className='mt-1 ml-2'>{ratings}</div>
      <div className='mt-1 ml-2'>{price}</div>
    </div>
  )
}
