import { User } from '~/types/user.type'
import http from '~/utils/http'

const URL = 'user/getUserByEmail'
// const fullUrl = 'user/getUserByEmail/nhuphivo@gmail.com'
const userDataApi = {
  getUserData(email: string) {
    const fullUrl = `${URL}/${encodeURIComponent(email)}`
    console.log(fullUrl);
    console.log('userDataApi.getUserData');
    console.log('====================================');
    console.log('====================================');
    console.log('====================================');
    return http.get<User>(fullUrl)
  }
}

export default userDataApi
