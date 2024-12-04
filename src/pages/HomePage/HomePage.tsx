import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { NavigationOptions } from 'swiper/types'

import { Navigation } from 'swiper/modules'
import { useQuery } from '@tanstack/react-query'
import travelApi from '~/apis/travels.api'
import InformationCard from '~/components/InformationCard'

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ['travels'],
    queryFn: () => travelApi.getTravelsByType()
  })
  const tourData = data?.attractions

  const prevRef = useRef<HTMLButtonElement | null>(null) // Ref cho nút Prev
  const nextRef = useRef<HTMLButtonElement | null>(null) // Ref cho nút Next

  const renderData = () => {
    return tourData?.map((travel, index) => {
      return (
        <SwiperSlide key={index}>
          <InformationCard
            id={travel._id}
            title={travel.title}
            place={travel.city}
            ratings={travel.rating}
            imgUrl={travel.imageUrl[0]}
            price={travel.price}
          />
        </SwiperSlide>
      )
    })
  }

  return (
    <div className='w-4/5 mx-auto mt-10'>
      <div className='w-full mx-auto'>
        <div className='h-96 w-full mx-auto'>
          <header className='text-2xl font-bold'>Super Hot Sale</header>
          <img src='/src/assets/bareBanner2.jpeg' alt='banner' className='w-full h-full object-fill mt-5' />
        </div>
        <div className='h-72 mx-auto mt-28'>
          <header className='text-2xl font-bold'>12.12 Big Sale Coming</header>
          <div className='flex grid grid-cols-6 gap-7 mt-5'>
            <img src='/src/assets/bareBanner.avif' alt='banner' className='col-span-3 h-full object-fill' />
            <img src='/src/assets/newYearBanner.avif' alt='banner' className='col-span-3 h-full object-fil' />
          </div>
        </div>
        <div className='h-96 col-span-12 mx-auto mt-40'>
          <header className='text-2xl font-bold'>Big Sale For Christmas</header>
          <img src='/src/assets/christmas.avif' alt='banner' className='w-full h-full object-fill mt-5' />
        </div>
      </div>
      <div className='mt-28'>
        <header className='text-3xl font-bold'>Most Attractive Place</header>
        <div className='relative'>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            onBeforeInit={(swiper) => {
              // Kiểm tra nếu navigation là kiểu NavigationOptions
              if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                const navigationParams = swiper.params.navigation as NavigationOptions
                navigationParams.prevEl = prevRef.current
                navigationParams.nextEl = nextRef.current
              }
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current
            }}
          >
            {renderData()}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            ref={prevRef}
            className='absolute top-1/2 left-1 z-10 transform -translate-y-1/2 bg-white text-blue-800 p-3 rounded-full'
          >
            ←
          </button>
          <button
            ref={nextRef}
            className='absolute top-1/2 right-1 z-10 transform -translate-y-1/2 bg-white text-blue-800 p-3 rounded-full'
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
