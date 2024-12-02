export interface Travel {
  _id: string
  title: string
  description: string
  imageUrl: string[]
  price: number
  rating: number
  travelType: string
}

export interface Flight extends Travel {
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  airline: string
}

export interface Attraction extends Travel {
  destination: string
  duration: string
  city: string
  capacity: number
}

export interface Stay extends Travel {
  address: string
  contact: string
  city: string
}

export interface CarRental extends Travel {
  location: string
  contact: string
  carType: string
}
export type TravelList = Travel[]
export type FlightList = Flight[]
export type CarRentalList = CarRental[]
export type AttractionList = Attraction[]
export type StayList = Stay[]
