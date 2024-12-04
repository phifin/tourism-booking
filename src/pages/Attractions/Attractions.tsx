import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useMemo } from 'react'
import travelApi from '~/apis/travels.api'
import InformationLongCard from '~/components/InformationLongCard/InformationLongCard'

export default function Attractions() {
  const { data } = useQuery({
    queryKey: ['travels'],
    queryFn: () => {
      return travelApi.getTravelsByType()
    }
  })

  // Wrap the tourData initialization with useMemo to avoid unnecessary recalculations
  const tourData = useMemo(() => {
    return data?.attractions || [] // Fallback to an empty array if data?.attractions is undefined
  }, [data?.attractions]) // Dependency on data.attractions to recalculate only when it changes

  const [sortedTourData, setSortedTourData] = useState(tourData)
  const [sortCheck, setSortCheck] = useState<boolean>(false)
  const [typeSortCheck, setTypeSortCheck] = useState<string>('Filter By')

  // Use effect to handle sorting when `tourData`, `sortCheck`, or `typeSortCheck` changes
  useEffect(() => {
    const sortedData = [...tourData] // Create a copy to avoid mutation

    if (sortCheck) {
      if (typeSortCheck === 'price') {
        sortedData.sort((a, b) => Number(a.price) - Number(b.price)) // Sort by price (low to high)
      } else if (typeSortCheck === 'rating') {
        sortedData.sort((a, b) => a.rating - b.rating) // Sort by rating (low to high)
      }
    }

    setSortedTourData(sortedData) // Update the state with sorted data
  }, [tourData, sortCheck, typeSortCheck]) // Dependencies: watch for changes in `tourData`, `sortCheck`, `typeSortCheck`

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
