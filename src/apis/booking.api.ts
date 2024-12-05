import { Booking, BookingList } from '~/types/booking.type'
import http from '~/utils/http'

const URLGetAll = 'book/getAllBooksByUserId'
// const URLGetOne = 'travel/getTravelById'
const URLCreateBook = 'book/createBook'

const bookingApi = {
  getAllBookings(id: string) {
    return http.get<BookingList>(`${URLGetAll}/${id}`).then((response) => {
      const bookings = response.data
      return bookings
    })
  },

  createNewBooking(userId: string, travelId: string, bookedDate: string, amount: number) {
    const body = {
      userId,
      travelId,
      bookedDate,
      amount
    }

    return http.post<Booking>(URLCreateBook, body)
  }
  // getBookById<T extends Flight | Stay | Attraction | CarRental>(id: string): Promise<T> {
  //   return http.get<Travel>(`${URLGetOne}/${id}`).then((response) => {
  //     const travelDetail = response.data

  //     // Type guard to ensure type correctness
  //     if (travelDetail.travelType === 'flight' && (travelDetail as Flight)) {
  //       return travelDetail as T
  //     }
  //     if (travelDetail.travelType === 'carRental' && (travelDetail as CarRental)) {
  //       return travelDetail as T
  //     }
  //     if (travelDetail.travelType === 'tour' && (travelDetail as Attraction)) {
  //       return travelDetail as T
  //     }
  //     if (travelDetail.travelType === 'hotel' && (travelDetail as Stay)) {
  //       return travelDetail as T
  //     }

  //     throw new Error(`Unexpected travel type: ${travelDetail.travelType}`)
  //   })
  // }
}

export default bookingApi
