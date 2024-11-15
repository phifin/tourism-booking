export interface Travel {
  _id: string
  title: string
  description: string
  imageUrl: string[]
  travelType: string
  price: number
  ratingPostsIds: never[]
  destination: string
  duration: string
  city: string
  __v: number
  rating: number
}

export type TravelList = Travel[]
