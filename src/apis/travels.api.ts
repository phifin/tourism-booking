import { TravelList } from '~/types/travels.type'
import http from '~/utils/http'

const URL = 'travel/getAllTravels'

const travelApi = {
  getTravels() {
    return http.get<TravelList>(URL)
  }
  // getTravelDetails (id: string) {
  //   return http.get<Travel>()
  // }
}
export default travelApi
