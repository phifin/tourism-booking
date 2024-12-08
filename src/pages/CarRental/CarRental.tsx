import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import travelApi from '~/apis/travels.api'
import InformationLongCard from '~/components/InformationLongCard/InformationLongCard'

export default function CarRentals() {
  const { data } = useQuery({
    queryKey: ['travels'],
    queryFn: () => {
      return travelApi.getTravelsByType()
    }
  })

  // Lọc dữ liệu có travelType === 'tour'
  const tourData = data?.carRentals
  const [sortCheck, setSortCheck] = useState<boolean>(false)
  const [typeSortCheck, setTypeSortCheck] = useState<string>('')
  if (sortCheck) {
    if (typeSortCheck === 'price') {
      tourData?.sort((a, b) => a.price - b.price)
    } else if (typeSortCheck === 'rating') {
      tourData?.sort((a, b) => a.rating - b.rating)
    }
  }
  const renderData = () => {
    return tourData?.map((travel, index) => {
      return (
        <InformationLongCard
          key={index}
          title={travel.title}
          location={travel.carType}
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

// import { useEffect, useState } from 'react'
// import InformationLongCard from '~/components/InformationLongCard/InformationLongCard'
// import { useSelector, useDispatch } from 'react-redux'
// import { fetchTravel } from '~/store/travel.slice'
// import { AppDispatch } from '~/store'
// import { CarRental, TravelModel } from '~/models/travels.model'

// export default function CarRentals() {
//   const dispatch: AppDispatch = useDispatch()
//   const { travels, isLoading, error } = useSelector((state: any) => state.travels)

//   useEffect(() => {
//     dispatch(fetchTravel())
//   }, [dispatch, error])

//   useEffect(() => {
//     // console.log(travels)
//     // const filteredTravels = travels.filter((travel: TravelModel) => travel.travelType === 'tour') as CarRental[]
//     // console.log(filteredTravels)
//   }, [travels])

//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>Error: {error}</div>

//   // const carRentals = travels.filter((travel: TravelModel) => travel.travelType === 'tour') as CarRental[]

//   const carRentals = travels as CarRental[]

//   // Lọc dữ liệu có travelType === 'tour'
//   const [sortCheck, setSortCheck] = useState<boolean>(false)
//   const [typeSortCheck, setTypeSortCheck] = useState<string>('')
//   if (sortCheck) {
//     if (typeSortCheck === 'price') {
//       carRentals?.sort((a, b) => a.price - b.price)
//     } else if (typeSortCheck === 'rating') {
//       carRentals?.sort((a, b) => a.rating - b.rating)
//     }
//   }
//   const renderData = () => {
//     return carRentals?.map((travel, index) => {
//       return (
//         <InformationLongCard
//           key={index}
//           title={travel.title}
//           location={travel.carType}
//           ratings={travel.rating}
//           image={travel.imageUrl[0]}
//           description={travel.description}
//           price={travel.price}
//           height='h-40'
//         />
//       )
//     })
//   }

//   return (
//     <div className='w-2/3 mx-auto'>
//       {/* Nút để thay đổi sort */}
//       <button onClick={() => setSortCheck(!sortCheck)}>Toggle Sort</button>

//       {/* Select để chọn loại sắp xếp */}
//       <select
//         onChange={(e) => setTypeSortCheck(e.target.value)}
//         value={typeSortCheck}
//         className='p-2 rounded-md border border-gray-300 text-gray-700 bg-white font-medium focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:outline-none'
//       >
//         <option value='price'>Price</option>
//         <option value='rating'>Rating</option>
//       </select>

//       {renderData()}
//     </div>
//   )
// }
