import axios, { AxiosInstance } from 'axios'
import { getAccessTokenFromLS, saveAccessTokenToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/VelocityBackend_war_exploded/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/auth/login') {
          const accessToken = response.data.accessToken
          if (accessToken) {
            this.accessToken = accessToken
            console.log('Access Token from response:', this.accessToken)
            saveAccessTokenToLS(this.accessToken)
            console.log('Token saved to localStorage:', getAccessTokenFromLS())
          } else {
            console.warn('Access token is missing from response')
          }
        }
        return response
      },
      (error) => {
        console.error('Response error:', error)
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
