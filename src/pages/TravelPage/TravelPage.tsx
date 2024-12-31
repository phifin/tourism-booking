import { useState, useEffect, useMemo } from 'react'
import { InformationLongCard, ShimmerEffectList } from '~/components/InformationLongCard/InformationLongCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTravel } from '~/store/travel.slice'
import { AppDispatch, RootState } from '~/store'
import { Hotel, Tour, TravelModel } from '~/models/travels.model'
import SearchBar from '~/components/SearchBar'

export default function Attractions({ travelType }: { travelType: string }) {
  const dispatch: AppDispatch = useDispatch()
  const { travels, isLoading, error } = useSelector((state: RootState) => state.travels)

  useEffect(() => {
    dispatch(fetchTravel())
  }, [dispatch])

  // Lọc dữ liệu theo loại travelType
  const travel = travels!.filter((travel: TravelModel) => travel.travelType === travelType) as TravelModel[]

  const travelData = useMemo(() => {
    return travel || [] // Fallback to an empty array if travel is undefined
  }, [travel])

  const [sortCheck, setSortCheck] = useState(false)
  const [typeSortCheck, setTypeSortCheck] = useState('default')
  const [searchQuery, setSearchQuery] = useState({ keyword: '', priceRange: '', timeBudget: '' })

  // Reset filters và searchQuery khi travelType thay đổi
  useEffect(() => {
    setSortCheck(false)
    setTypeSortCheck('default')
    setSearchQuery({ keyword: '', priceRange: '', timeBudget: '' })
  }, [travelType])

  const sortedAndFilteredData = useMemo(() => {
    let filteredData = [...travelData]

    // Lọc theo từ khóa
    if (searchQuery.keyword) {
      filteredData = filteredData.filter((item) => item.title.toLowerCase().includes(searchQuery.keyword.toLowerCase()))
    }

    // Lọc theo khoảng giá (nếu cần)
    if (searchQuery.priceRange) {
      const [minPrice, maxPrice] = searchQuery.priceRange.split('-').map(Number)
      filteredData = filteredData.filter((item) => item.price >= minPrice && item.price <= maxPrice)
    }

    // Lọc theo thời gian (nếu cần)
    if (searchQuery.timeBudget) {
      filteredData = filteredData.filter((item) =>
        item.description.toLowerCase().includes(searchQuery.timeBudget.toLowerCase())
      )
    }

    // Sắp xếp dữ liệu nếu cần
    if (sortCheck) {
      if (typeSortCheck === 'price') {
        filteredData.sort((a, b) => Number(a.price) - Number(b.price))
      } else if (typeSortCheck === 'rating') {
        filteredData.sort((a, b) => a.rating - b.rating)
      }
    }

    return filteredData
  }, [travelData, sortCheck, typeSortCheck, searchQuery])

  const renderData = () => {
    if (error) return <div>Error: {error}</div>
    if (isLoading) return <ShimmerEffectList count={5} />
    return sortedAndFilteredData?.map((travel, index) => {
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
    <div>
      <div className='w-3/4 mx-auto'>
        <SearchBar
          onSearch={(query) => setSearchQuery(query)} // Callback nhận giá trị tìm kiếm
        />
      </div>
      <div className='w-2/3 mt-10 mx-auto'>
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
    </div>
  )
}
