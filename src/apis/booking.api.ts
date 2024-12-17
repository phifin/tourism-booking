import { BookingModel } from '~/models/booking.model';
import http from '~/utils/http'

const basePath = 'book'

const bookingApi = {
  getAllBookingsByUserId(id: string) {
    console.log(`${basePath}/getAllBooksByUserId/${id}`);

    return http.get<BookingModel[]>(`${basePath}/getAllBooksByUserId/${id}`).then((response) => {
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

    return http.post<BookingModel>(`${basePath}`, body)
  }
}

export default bookingApi
