import { useState, useEffect, useMemo } from 'react'
import InformationLongCard from '~/components/InformationLongCard/InformationLongCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTravel } from '~/store/travel.slice'
import { AppDispatch, RootState } from '~/store'
import { Tour, TravelModel } from '~/models/travels.model'

export default function Attractions() {
  const dispatch: AppDispatch = useDispatch()
  const { travels, isLoading, error } = useSelector((state: RootState) => state.travels)

  useEffect(() => {
    dispatch(fetchTravel())
  }, [dispatch])

  const tour = travels!.filter((travel: TravelModel) => travel.travelType === 'Tour') as Tour[]

  // Wrap the tourData initialization with useMemo to avoid unnecessary recalculations
  const tourData = useMemo(() => {
    return tour || [] // Fallback to an empty array if tour is undefined
  }, [tour]) // Dependency on data.attractions to recalculate only when it changes

  const [sortCheck, setSortCheck] = useState(false)
  const [typeSortCheck, setTypeSortCheck] = useState('default')

  const sortedTourData = useMemo(() => {
    if (!sortCheck) return tourData

    const sorted = [...tourData]
    if (typeSortCheck === 'price') {
      sorted.sort((a, b) => Number(a.price) - Number(b.price))
    } else if (typeSortCheck === 'rating') {
      sorted.sort((a, b) => a.rating - b.rating)
    }
    return sorted
  }, [tourData, sortCheck, typeSortCheck])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const renderData = () => {
    return sortedTourData?.map((travel, index) => {
      return (
        <InformationLongCard
          key={index}
          id={travel._id}
          title={travel.title}
          location={travel.city}
          ratings={travel.rating}
          image={travel.imageUrl[0]}
          description={travel.description}
          price={travel.price}
          height='h-44'
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
