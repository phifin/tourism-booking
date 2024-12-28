import { useState, useEffect, useMemo } from 'react'
import { InformationLongCard, ShimmerEffectList } from '~/components/InformationLongCard/InformationLongCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTravel } from '~/store/travel.slice'
import { AppDispatch, RootState } from '~/store'
import { Hotel, Tour, TravelModel } from '~/models/travels.model'

export default function Attractions({ travelType }: { travelType: string }) {
  const dispatch: AppDispatch = useDispatch()
  const { travels, isLoading, error } = useSelector((state: RootState) => state.travels)

  useEffect(() => {
    dispatch(fetchTravel())
  }, [dispatch])

  const travel = travels!.filter((travel: TravelModel) => travel.travelType === travelType) as TravelModel[]

  // Wrap the travelData initialization with useMemo to avoid unnecessary recalculations
  const travelData = useMemo(() => {
    return travel || [] // Fallback to an empty array if travel is undefined
  }, [travel]) // Dependency on data.attractions to recalculate only when it changes

  const [sortCheck, setSortCheck] = useState(false)
  const [typeSortCheck, setTypeSortCheck] = useState('default')

  const sortedTourData = useMemo(() => {
    if (!sortCheck) return travelData

    const sorted = [...travelData]
    if (typeSortCheck === 'price') {
      sorted.sort((a, b) => Number(a.price) - Number(b.price))
    } else if (typeSortCheck === 'rating') {
      sorted.sort((a, b) => a.rating - b.rating)
    }
    return sorted
  }, [travelData, sortCheck, typeSortCheck])

  const renderData = () => {
    if (error) return <div>Error: {error}</div>
    if (isLoading) return <ShimmerEffectList count={5} />
    return sortedTourData?.map((travel, index) => {
      return (
        <InformationLongCard
          key={index}
          id={travel.id}
          title={travel.title}
          city={'city' in travel ? (travel as Hotel | Tour).city : undefined}
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

      <div className='flex justify-center items-center mt-4'>
        <button
          className='px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={true} // Replace with logic for disabling Previous
        >
          Previous
        </button>
        <div className='flex space-x-2'>
          {/* Replace this with dynamic page numbers */}
          <button className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600'>1</button>
          <button className='px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300'>2</button>
          <button className='px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300'>3</button>
        </div>
        <button
          className='px-4 py-2 ml-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={false} // Replace with logic for disabling Next
        >
          Next
        </button>
      </div>
    </div>
  )
}
