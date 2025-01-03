export interface Post {
  _id: string
  userId: string
  content: string
  likes: string[]
  comments: string[]
  imageUrl: string
  shares: string[]
  createdAt: string
}

export type PostList = Post[]
