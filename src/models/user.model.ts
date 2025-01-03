export interface UserModel {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  userFriends: never[]
  refreshToken: string
  bookmarksId: string[]
  updatedAt: string
  profileImageUrl: string
  progression: number
  userType: string
  createdAt: string
  friendsId: string[]
}
