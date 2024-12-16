export interface TravelModel {
  id: string
  title: string
  description: string
  imageUrl: string[]
  price: number
  rating: number
  travelType: string
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