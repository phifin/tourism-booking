import { FlightList, AttractionList, StayList, CarRentalList, TravelList } from '~/types/travels.type'
import http from '~/utils/http'

const URL = 'travel/getAllTravels'

const travelApi = {
  getTravelsByType() {
    return http.get<TravelList>(URL).then((response) => {
      const travels = response.data
      const flights = travels.filter((item) => item.travelType === 'flight') as FlightList
      const attractions = travels.filter((item) => item.travelType === 'tour') as AttractionList
      const stays = travels.filter((item) => item.travelType === 'hotel') as StayList
      const carRentals = travels.filter((item) => item.travelType === 'carRental') as CarRentalList

      return {
        flights,
        attractions,
        stays,
        carRentals
      }
    })
  }
}

export default travelApi
