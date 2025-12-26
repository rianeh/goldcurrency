import axios, { AxiosInstance } from 'axios'

const BASE_URL = 'https://BrsApi.ir/Api/Market/'
const API_KEY = 'B9QnSJaGl6ihbW6PEDz2qypIb6V1d7Nu'

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(config => {
  try {
    // append API key to all requests
    config.params = Object.assign({}, config.params || {}, { key: API_KEY })
    // attach auth header if present
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers = config.headers || {}
      ;(config.headers as any).Authorization = 'Bearer ' + token
    }
  } catch (e) {
    console.warn('Error setting request params:', e)
  }
  return config
}, error => Promise.reject(error))

api.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export default api
