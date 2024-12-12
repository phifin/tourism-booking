import { useEffect, useState } from 'react'
import InformationLongCard from '~/components/InformationLongCard/InformationLongCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTravel } from '~/store/travel.slice'
import { AppDispatch, RootState } from '~/store'
import { CarRental, TravelModel } from '~/models/travels.model'

export default function CarRentals() {
  const dispatch: AppDispatch = useDispatch()
  const { travels, isLoading, error } = useSelector((state: RootState) => state.travels)

  useEffect(() => {
    dispatch(fetchTravel())
  }, [dispatch])

  const carRentals = travels!.filter((travel: TravelModel) => travel.travelType === 'carRental') as CarRental[]

  const [sortCheck, setSortCheck] = useState<boolean>(false)
  const [typeSortCheck, setTypeSortCheck] = useState<string>('')
  if (sortCheck) {
    if (typeSortCheck === 'price') {
      carRentals?.sort((a, b) => a.price - b.price)
    } else if (typeSortCheck === 'rating') {
      carRentals?.sort((a, b) => a.rating - b.rating)
    }
  }
  const renderData = () => {
    return carRentals?.map((travel, index) => {
      return (
        <InformationLongCard
          key={index}
          title={travel.title}
          // location={travel.carType}
          location='Car Rental'
          ratings={travel.rating}
          image={travel.imageUrl[0]}
          description={travel.description}
          price={travel.price}
          height='h-40'
        />
      )
    })
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='w-2/3 mx-auto'>
      {/* Nút để thay đổi sort */}
      <button onClick={() => setSortCheck(!sortCheck)}>Toggle Sort</button>

      {/* Select để chọn loại sắp xếp */}
      <select
        onChange={(e) => setTypeSortCheck(e.target.value)}
        value={typeSortCheck}
        className='p-2 rounded-md border border-gray-300 text-gray-700 bg-white font-medium focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:outline-none'
      >
        <option value='price'>Price</option>
        <option value='rating'>Rating</option>
      </select>

      {renderData()}
    </div>
  )
}
