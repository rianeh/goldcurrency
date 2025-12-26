
import axios from 'axios'

const BASE_URL = 'https://BrsApi.ir/Api/Market/'
const API_KEY = 'B9QnSJaGl6ihbW6PEDz2qypIb6V1d7Nu'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000 
})

api.interceptors.request.use(function (config) {
  try {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = 'Bearer ' + token
    }
  } catch (e) {
    console.warn('خطا در گرفتن توکن:', e)
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

api.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  if (error && error.response && error.response.status === 401) {
    try {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    } catch (e) {
      console.warn('خطا در هدایت به لاگین:', e)
    }
  }
  return Promise.reject(error)
})

export default api
