import { UserList } from '~/types/user.type'
import http from '~/utils/http'

const URL = 'user/getUserByEmail'
// const fullUrl = 'user/getUserByEmail/nhuphivo@gmail.com'
const userDataApi = {
  getUserData(email: string) {
    const fullUrl = `${URL}/${encodeURIComponent(email)}`
    return http.get<UserList>(fullUrl)
  }
}

export default userDataApi
