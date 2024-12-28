import { Flight, CarRental, Tour, Hotel, TravelModel } from '~/models/travels.model'
import http from '~/utils/http'

const dataPath = 'travel'

const travelApi = {
  fetchAllTravels: async (): Promise<TravelModel[]> => {
    const response = await http.get<TravelModel[]>(`${dataPath}`)

    return response.data
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
  postTravelData: async (
    title?: string,
    description?: string,
    body?: string,
    imageUrl?: string[],
    travelType?: string, // Hotel, Flight, Tour, CarRental
    price?: number,
    address?: string,
    contact?: string,
    createdAt?: string,
    city?: string,
    capacity?: number,
    origin?: string,
    destination?: string,
    startDate?: string,
    endDate?: string,
    airline?: string,
    location?: string,
    carType?: string
  ) => {
    const postData = {
      title,
      description,
      body,
      imageUrl,
      travelType,
      price,
      address,
      contact,
      createdAt,
      city,
      capacity,
      origin,
      destination,
      startDate,
      endDate,
      airline,
      location,
      carType
    }

    try {
      const response = await http.post(`${dataPath}`, postData)
      return response.data
    } catch (error) {
      console.error('Error posting travel data:', error)
      throw error
    }
  }
}

export default travelApi
