import { FlightList, AttractionList, StayList, CarRentalList, TravelList } from '~/types/travels.type'
import http from '~/utils/http'
import { TravelModel } from '~/models/travels.model'
import axios from 'axios';

const URL = 'travel/getAllTravels'

const baseUrl = 'http://localhost:3000/travel/';

const travelApi = {
  fetchAllTravels: async (): Promise<TravelModel[]> => {
    const response = await axios.get<TravelModel[]>(`${baseUrl}/getAllTravels`);
    return response.data;
  },

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
