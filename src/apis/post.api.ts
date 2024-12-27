import http from '~/utils/http'
import { PostModel } from '~/models/post.model'
const URLGetAll = 'post'
const URLLikePost = 'post/likePost'
const URLCreatePost = 'post'
const URLUploadImage = 'cloudinary/uploadImage'
// const URLGetOne = 'travel/getTravelById'
// const URLCreateBook = 'book/createBook'

export const postApi = {
  getAllPosts() {
    return http.get<PostModel[]>(URLGetAll).then((response) => {
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
  async createPost({
    userId,
    content,
    postId,
    imageUrl
  }: {
    userId: string | undefined
    content: string
    postId: string | null
    imageUrl: string | null
  }) {
    const response = await http.post(URLCreatePost, {
      userId,
      content,
      postId,
      imageUrl
    })
    return response.data
  },
  async uploadImage(image: File) {
    const formData = new FormData()
    formData.append('file', image)

    try {
      const response = await http.post(URLUploadImage, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response.data)
      return response.data // Trả về URL của ảnh từ Cloudinary
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
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
