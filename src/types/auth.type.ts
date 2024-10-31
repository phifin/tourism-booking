import { User } from './user.type'
import { SuccessReponse } from './utils.type'

export type AuthResponse = SuccessReponse<{
  accessToken: string
  expires: string
  user: User
}>
