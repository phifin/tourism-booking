import { useEffect, useMemo, useState } from 'react'
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

  const carRentalsData = travels!.filter((travel: TravelModel) => travel.travelType === 'CarRental') as CarRental[]

  // Wrap the tourData initialization with useMemo to avoid unnecessary recalculations
  const carRentals = useMemo(() => {
    return carRentalsData || [] // Fallback to an empty array if tour is undefined
  }, [carRentalsData]) // Dependency on data.attractions to recalculate only when it changes

  const [sortCheck, setSortCheck] = useState(false)
  const [typeSortCheck, setTypeSortCheck] = useState('default')

  const sortedCarRentals = useMemo(() => {
    if (!sortCheck) return carRentals

    const sorted = [...carRentals]
    if (typeSortCheck === 'price') {
      sorted.sort((a, b) => Number(a.price) - Number(b.price))
    } else if (typeSortCheck === 'rating') {
      sorted.sort((a, b) => a.rating - b.rating)
    }
    return sorted
  }, [carRentals, sortCheck, typeSortCheck])

  const renderData = () => {
    return sortedCarRentals?.map((travel, index) => {
      return (
        <InformationLongCard
          key={index}
          id={travel.id}
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
      <select
        onChange={(e) => {
          setTypeSortCheck(e.target.value)
          setSortCheck(true) // Trigger sorting when a filter is selected
        }}
        value={typeSortCheck}
        className='p-2 rounded-md border border-gray-300 text-gray-700 bg-white font-medium focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:outline-none'
      >
        <option value='default'>Filter By</option>
        <option value='price'>Price</option>
        <option value='rating'>Rating</option>
      </select>

      {renderData()}
    </div>
  )
}
