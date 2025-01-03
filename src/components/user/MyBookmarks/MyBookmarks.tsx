import React from 'react'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '~/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookingsByUserId } from '~/store/booking.slice'
import { InformationLongCard } from '~/components/InformationLongCard/InformationLongCard'
import { fetchTravel } from '~/store/travel.slice'

function BookingHistory() {
  const dispatch: AppDispatch = useDispatch()
  const userRedux = useSelector((state: RootState) => state.user)
  const travelRedux = useSelector((state: RootState) => state.travels)

  useEffect(() => {
    if (userRedux.data) {
      dispatch(fetchBookingsByUserId(userRedux.data!.id))
    }
  }, [dispatch])

  useEffect(() => {
    if (!travelRedux.travels.length) {
      dispatch(fetchTravel())
    }
  }, [dispatch, travelRedux.travels?.length])

  if (userRedux.loading || travelRedux.isLoading) return <div>Loading...</div>
  if (userRedux.error || travelRedux.error) return <div>Unexpected Error</div>

  // Hàm render BookingCard
  const renderBookingCards = () => {
    if (userRedux.data?.bookmarksId === null || userRedux.data?.bookmarksId.length === 0) {
      return <div>No bookmarks found!</div>
    }

    return userRedux.data?.bookmarksId.map((travelId: string) => {
      const travel = travelRedux.travels.find((travel) => {
        console.log(travel)
        return travel.id === travelId
      })
      console.log(travel)

      if (travel) {
        return <InformationLongCard key={travel.id} travelData={travel} />
      }
    })
  }

  // Render dữ liệu booking
  return (
    <div>
      <header className='text-xl font-bold mb-5'>Booking List</header>
      <div>{renderBookingCards()}</div>
    </div>
  )
}

const MyBookmarks: React.FC = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>My Bookings</h1>
      <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg border rounded-md'>{BookingHistory()}</div>
    </div>
  )
}

export default MyBookmarks
