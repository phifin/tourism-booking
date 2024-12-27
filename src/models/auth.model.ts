import { UserModel } from './user.model'
import { SuccessReponse } from './utils.model'

export type AuthResponse = SuccessReponse<{
  accessToken: string
  expires: string
  user: UserModel
}>
