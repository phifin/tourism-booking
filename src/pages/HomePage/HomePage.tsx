import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useQuery } from '@tanstack/react-query'
import travelApi from '~/apis/travels.api'
import InformationCard from '~/components/InformationCard'
import HomeCardSlide from '~/components/HomeCardSlide'

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ['travels'],
    queryFn: () => travelApi.getTravelsByType()
  })
  const tourData = data?.attractions
  const stayData = data?.stays
  const flightData = data?.flights
  const carRentalData = data?.carRentals
  const renderTourData = () => {
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

  const renderStayData = () => {
    return stayData?.map((travel, index) => {
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

  const renderFlightData = () => {
    return flightData?.map((travel, index) => {
      return (
        <SwiperSlide key={index}>
          <InformationCard
            id={travel._id}
            title={travel.title}
            place={travel.destination}
            ratings={travel.rating}
            imgUrl={travel.imageUrl[0]}
            price={travel.price}
          />
        </SwiperSlide>
      )
    })
  }

  const renderCarRentalData = () => {
    return carRentalData?.map((travel, index) => {
      return (
        <SwiperSlide key={index}>
          <InformationCard
            id={travel._id}
            title={travel.title}
            place={travel.location}
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
        <div className='h-72 mx-auto mt-10'>
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
        <HomeCardSlide renderData={renderTourData} />
      </div>
      <div className='mt-24'>
        <header className='text-3xl font-bold'>Your Best Suitable Flights</header>
        <HomeCardSlide renderData={renderFlightData} />
      </div>
      <div className='mt-24'>
        <header className='text-3xl font-bold'>Most Comfortable And Convenient Houses</header>
        <HomeCardSlide renderData={renderStayData} />
      </div>
      <div className='mt-24'>
        <header className='text-3xl font-bold'>Most Reasonable Pricing CarRental</header>
        <HomeCardSlide renderData={renderCarRentalData} />
      </div>
    </div>
  )
}
