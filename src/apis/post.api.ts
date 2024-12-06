import { PostList } from '~/types/post.type'
import http from '~/utils/http'

const URLGetAll = 'post'
// const URLGetOne = 'travel/getTravelById'
// const URLCreateBook = 'book/createBook'

const postDataApi = {
  getAllPosts() {
    return http.get<PostList>(URLGetAll).then((response) => {
      const posts = response.data
      return posts
    })
  }

  // createNewBooking(userId: string, travelId: string, bookedDate: string, amount: number) {
  //   const body = {
  //     userId,
  //     travelId,
  //     bookedDate,
  //     amount
  //   }

  //   return http.post<Booking>(URLCreateBook, body)
  // }
  // getPostById()
  // getPostById<T extends Flight | Stay | Attraction | CarRental>(id: string): Promise<T> {
  //   return http.get<Travel>(`${URLGetOne}/${id}`).then((response) => {
  //     const travelDetail = response.data

  //     // Type guard to ensure type correctness
  //     if (travelDetail.travelType === 'flight' && (travelDetail as Flight)) {
  //       return travelDetail as T
  //     }
  //     if (travelDetail.travelType === 'carRental' && (travelDetail as CarRental)) {
  //       return travelDetail as T
  //     }
  //     if (travelDetail.travelType === 'tour' && (travelDetail as Attraction)) {
  //       return travelDetail as T
  //     }
  //     if (travelDetail.travelType === 'hotel' && (travelDetail as Stay)) {
  //       return travelDetail as T
  //     }

  //     throw new Error(`Unexpected travel type: ${travelDetail.travelType}`)
  //   })
  // }
}

export default postDataApi
