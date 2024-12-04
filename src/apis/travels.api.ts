import { FlightList, AttractionList, StayList, CarRentalList, TravelList, Travel } from '~/types/travels.type'
import http from '~/utils/http'

const URLGetAll = 'travel/getAllTravels'
const URLGetOne = 'travel/getTravelById'

const travelApi = {
  getTravelsByType() {
    return http.get<TravelList>(URLGetAll).then((response) => {
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
  },
  getTravelById(id: string) {
    return http.get<Travel>(`${URLGetOne}/${id}`).then((response) => {
      const travelDetail = response.data
      return travelDetail
    })
  }
}

export default travelApi
