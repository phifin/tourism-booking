import {
  FlightList,
  AttractionList,
  StayList,
  CarRentalList,
  TravelList,
  Flight,
  CarRental,
  Attraction,
  Stay,
  Travel
} from '~/types/travels.type'
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
  getTravelById<T extends Flight | Stay | Attraction | CarRental>(id: string): Promise<T> {
    return http.get<Travel>(`${URLGetOne}/${id}`).then((response) => {
      const travelDetail = response.data

      // Type guard to ensure type correctness
      if (travelDetail.travelType === 'flight' && (travelDetail as Flight)) {
        return travelDetail as T
      }
      if (travelDetail.travelType === 'carRental' && (travelDetail as CarRental)) {
        return travelDetail as T
      }
      if (travelDetail.travelType === 'tour' && (travelDetail as Attraction)) {
        return travelDetail as T
      }
      if (travelDetail.travelType === 'hotel' && (travelDetail as Stay)) {
        return travelDetail as T
      }

      throw new Error(`Unexpected travel type: ${travelDetail.travelType}`)
    })
  }
}

export default travelApi
