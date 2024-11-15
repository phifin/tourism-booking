import { useQuery } from '@tanstack/react-query'
import React from 'react'
import travelApi from '~/apis/travels.api'
import InformationCard from '~/components/InformationCard'

export default function Attractions() {
  const { data } = useQuery({
    queryKey: ['travels'],
    queryFn: () => {
      return travelApi.getTravels()
    }
  })
  console.log(data)
  const renderData = () => {
    return data?.data.map((travel, index) => {
      return (
        <InformationCard
          key={index}
          header={travel.title}
          place={travel.city}
          reviewNums={travel.rating}
          reviewPoint={travel.rating}
          imgUrl={travel.imageUrl[0]}
        />
      )
    })
  }
  return <div className='w-5/6 mx-auto grid grid-cols-4 gap-5'>{renderData()}</div>
}
