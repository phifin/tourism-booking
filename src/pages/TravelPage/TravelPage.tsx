import { useState, useEffect, useMemo } from 'react'
import { InformationLongCard, ShimmerEffectList } from '~/components/InformationLongCard/InformationLongCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTravel } from '~/store/travel.slice'
import { AppDispatch, RootState } from '~/store'
import { TravelModel } from '~/models/travels.model'

export default function Attractions({ travelType }: { travelType: string }) {
  const dispatch: AppDispatch = useDispatch()
  const { travels, isLoading, error } = useSelector((state: RootState) => state.travels)

  useEffect(() => {
    if (travels.length === 0) {
      dispatch(fetchTravel())
    }
  }, [dispatch, travels?.length])

  const travel = travels!.filter((travel: TravelModel) => travel.travelType === travelType) as TravelModel[]

  // Wrap the travelData initialization with useMemo to avoid unnecessary recalculations
  const travelData = useMemo(() => {
    return travel || [] // Fallback to an empty array if travel is undefined
  }, [travel]) // Dependency on data.attractions to recalculate only when it changes

  const [sortCheck, setSortCheck] = useState(false)
  const [typeSortCheck, setTypeSortCheck] = useState('default')

  const [currentPage, setCurrentPage] = useState<number>(0)
  const lastPageIndex = Math.ceil(travel.length / 5) - 1

  // add this to fix the issue where currentPage is not reverted back to 0 when user switch to another travel type
  useEffect(() => {
    setCurrentPage(0)
  }, [travelType])

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
    return sortedTourData.slice(currentPage * 5, currentPage * 5 + 5).map((travel) => {
      return <InformationLongCard key={travel.id} travelData={travel} />
    })
  }

  const handlePageChange = (index: number) => {
    setCurrentPage(index)

    console.log('====================================')
    console.log(index)

    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling animation
    })

    console.log('====================================')
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

      <div className='pb-10 '>
        <PaginationButtons currentIndex={currentPage} lastIndex={lastPageIndex} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}

function PaginationButtons({
  currentIndex,
  lastIndex,
  onPageChange
}: {
  currentIndex: number
  lastIndex: number
  onPageChange: (index: number) => void
}) {
  // Determine the range of pages to display
  const maxVisiblePages = 7

  let startPage = Math.max(0, currentIndex - 3)
  let endPage = startPage + maxVisiblePages - 1

  // Adjust start and end if the end exceeds the last index
  if (endPage > lastIndex) {
    endPage = lastIndex
    startPage = Math.max(0, endPage - maxVisiblePages + 1)
  }

  // Generate page numbers
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <div className='flex justify-center items-center mt-4'>
      {/* First Button */}
      <button
        className='px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={currentIndex === 0}
        onClick={() => onPageChange(0)}
      >
        First
      </button>

      {/* Previous Button */}
      <button
        className='px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={currentIndex === 0}
        onClick={() => onPageChange(currentIndex - 1)}
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className='flex space-x-2'>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`w-12 px-3 py-1 rounded-md text-center ${
              page === currentIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page + 1}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className='px-4 py-2 ml-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={currentIndex === lastIndex}
        onClick={() => onPageChange(currentIndex + 1)}
      >
        Next
      </button>
      {/* Last Button */}
      <button
        className='px-4 py-2 ml-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={currentIndex === lastIndex}
        onClick={() => onPageChange(lastIndex)}
      >
        Last
      </button>
    </div>
  )
}
