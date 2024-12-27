import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import InformationCard from '~/components/InformationCard'
import HomeCardSlide from '~/components/HomeCardSlide'
import { CarRental, Flight, Hotel, Tour, TravelModel } from '~/models/travels.model'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '~/store'
import { fetchTravel } from '~/store/travel.slice'

export default function HomePage() {
  const { travels, isLoading, error } = useSelector((state: RootState) => state.travels)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTravel())
  }, [dispatch])

  const tourData = travels?.filter((travel: TravelModel) => travel.travelType === 'Tour') as Tour[]
  const hotelData = travels?.filter((travel: TravelModel) => travel.travelType === 'Hotel') as Hotel[]
  const flightData = travels?.filter((travel: TravelModel) => travel.travelType === 'Flight') as Flight[]
  const carRentalData = travels?.filter((travel: TravelModel) => travel.travelType === 'CarRental') as CarRental[]

  const renderTourData = () => {
    return tourData?.map((travel, index) => {
      return (
        <SwiperSlide key={index}>
          <InformationCard
            id={travel.id}
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
    return hotelData?.map((travel, index) => {
      return (
        <SwiperSlide key={index}>
          <InformationCard
            id={travel.id}
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
            id={travel.id}
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
            id={travel.id}
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

  if (error) return <div>Error: {error}</div>
  if (isLoading) return <div>Loading...</div>

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
      <div>
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
    </div>
  )
}
