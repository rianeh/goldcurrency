import axios, { AxiosInstance } from 'axios'

const BASE_URL = 'https://brsapi.ir/free-api-gold-currency-webservice/'

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export default api
