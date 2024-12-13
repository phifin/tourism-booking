import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InformationLongCard from '~/components/InformationLongCard/InformationLongCard'
import { Flight, TravelModel } from '~/models/travels.model'
import { AppDispatch, RootState } from '~/store'
import { fetchTravel } from '~/store/travel.slice'

export default function Flights() {
  const dispatch: AppDispatch = useDispatch()
  const { travels, isLoading, error } = useSelector((state: RootState) => state.travels)

  useEffect(() => {
    dispatch(fetchTravel())
  }, [dispatch])

  const flightsData = travels!.filter((travel: TravelModel) => travel.travelType === 'Flight') as Flight[]

  // Wrap the tourData initialization with useMemo to avoid unnecessary recalculations
  const flights = useMemo(() => {
    return flightsData || [] // Fallback to an empty array if tour is undefined
  }, [flightsData]) // Dependency on data.attractions to recalculate only when it changes

  const [sortCheck, setSortCheck] = useState(false)
  const [typeSortCheck, setTypeSortCheck] = useState('default')

  const sortedFlights = useMemo(() => {
    if (!sortCheck) return flights

    const sorted = [...flights]
    if (typeSortCheck === 'price') {
      sorted.sort((a, b) => Number(a.price) - Number(b.price))
    } else if (typeSortCheck === 'rating') {
      sorted.sort((a, b) => a.rating - b.rating)
    }
    return sorted
  }, [flights, sortCheck, typeSortCheck])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const renderData = () => {
    return sortedFlights?.map((travel, index) => {
      return (
        <InformationLongCard
          key={index}
          id={travel.id}
          title={travel.title}
          location={travel.airline}
          ratings={travel.rating}
          image={travel.imageUrl[0]}
          description={travel.description}
          price={travel.price}
          height='h-40'
        />
      )
    })
  }

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
