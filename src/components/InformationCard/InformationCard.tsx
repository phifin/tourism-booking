import React from 'react'
import testImage from '~/assets/react.svg'

interface InformationProps {
  header: string
  place: string
  imgUrl: string
  reviewPoint: number
  reviewNums: number
}

export default function InformationCard({ header, place, imgUrl, reviewPoint, reviewNums }: InformationProps) {
  return (
    <div className='h-60 w-52 rounded-xl '>
      <img src={imgUrl} />
      <header>{header}</header>
    </div>
  )
}
