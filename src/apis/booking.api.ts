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
}

export default bookingApi
