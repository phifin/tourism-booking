import {
  Flight,
  CarRental,
  Tour,
  Hotel,
  TravelModel,
  TravelModelWithPage
} from '~/models/travels.model'
import http from '~/utils/http'

const dataPath = 'travel'

const travelApi = {
  fetchAllTravels: async (): Promise<TravelModel[]> => {
    console.log('fetching all travels');

    const response = await http.get<TravelModel[]>(`${dataPath}`);

    return response.data;
  },

  getTravelByPage: async (page: number, travelType: string): Promise<TravelModelWithPage> => {
    const response = await http.get<TravelModel[]>(`${dataPath}?page=${page}&travelType=${travelType}`);

    return {
      travel: response.data,
      page: page,
      travelType: travelType
    }
  },

  getTravelsByType() {
    return http.get<TravelModel[]>(`${dataPath}`).then((response) => {
      const travels = response.data
      const flights = travels.filter((item) => item.travelType === 'Flight') as Flight[]
      const attractions = travels.filter((item) => item.travelType === 'Tour') as Tour[]
      const stays = travels.filter((item) => item.travelType === 'Hotel') as Hotel[]
      const carRentals = travels.filter((item) => item.travelType === 'CarRental') as CarRental[]

      return {
        flights,
        attractions,
        stays,
        carRentals
      }
    })
  },
  getTravelById<T extends Flight | Hotel | Tour | CarRental>(id: string): Promise<T> {
    return http.get<TravelModel>(`${dataPath}/${id}`).then((response) => {
      const travelDetail = response.data

      // Type guard to ensure type correctness
      if (travelDetail.travelType === 'Flight' && (travelDetail as Flight)) {
        return travelDetail as T
      }
      if (travelDetail.travelType === 'CarRental' && (travelDetail as CarRental)) {
        return travelDetail as T
      }
      if (travelDetail.travelType === 'Tour' && (travelDetail as Tour)) {
        return travelDetail as T
      }
      if (travelDetail.travelType === 'Hotel' && (travelDetail as Hotel)) {
        return travelDetail as T
      }

      throw new Error(`Unexpected travel type: ${travelDetail.travelType}`)
    })
  },
  getTravelRatingById(id: string): Promise<number> {
    return http.get<number>(`${dataPath}/getTravelRatingByTravelId/${id}`).then((response) => {
      return response.data
    })
  },
}

export default travelApi
