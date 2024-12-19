export interface UserModel {
    id: string
    email: string
    password: string
    firstName: string
    lastName: string
    phoneNumber: string
    userFriends: never[]
    refreshToken: string
    bookmarkedTravels: string[]
    updatedAt: string
    profileImageUrl: string
}
