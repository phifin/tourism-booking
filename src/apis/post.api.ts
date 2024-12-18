import { PostList } from '~/types/post.type'
import http from '~/utils/http'

const URLGetAll = 'post'
const URLLikePost = 'post/likePost'
const URLCreatePost = 'post/createPost'
const URLUploadImage = 'post/uploadImage'
// const URLGetOne = 'travel/getTravelById'
// const URLCreateBook = 'book/createBook'

const postDataApi = {
  getAllPosts() {
    return http.get<PostList>(URLGetAll).then((response) => {
      const posts = response.data
      return posts
    })
  },
  likePost(userId: string, postId: string) {
    const body = {
      userId,
      postId
    }
    return http.post(URLLikePost, body)
  },
  async createPost(userId: string | undefined, content: string, image: File | null, postId: string | null) {
    if (image) {
      try {
        // Gọi method POST đầu tiên
        const firstResponse = await http.post(URLUploadImage, {
          image
        })

        const imageUrl = firstResponse.data.imageUrl // Chỉnh lại key theo response thực tế

        // Gọi method POST thứ hai với dữ liệu từ method đầu tiên
        const secondResponse = await http.post(URLCreatePost, {
          userId,
          content,
          postId,
          imageUrl // Data from cloudinary
        })

        // Trả về kết quả từ method POST thứ hai
        return secondResponse.data
      } catch (error) {
        console.error('Error creating post:', error)
        throw error
      }
    } else {
      const response = await http.post(URLCreatePost, {
        userId,
        content,
        postId
      })

      return response.data
    }
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
