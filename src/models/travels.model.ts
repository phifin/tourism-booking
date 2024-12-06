export interface TravelModel {
  _id: string
  title: string
  description: string
  imageUrl: string[]
  price: number
  rating: number
  TravelModelType: string
}

export interface Flight extends TravelModel {
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  airline: string
}

export interface Tour extends TravelModel {
  destination: string
  duration: string
  city: string
  capacity: number
}

export interface Hotel extends TravelModel {
  address: string
  contact: string
  city: string
}

export interface CarRental extends TravelModel {
  location: string
  contact: string
  carType: string
}

export type TravelList = TravelModel[]
export type FlightList = Flight[]
export type CarRentalList = CarRental[]
export type TourList = Tour[]
export type HotelList = Hotel[]
