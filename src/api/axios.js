
import axios from 'axios'

const BASE_URL = 'https://BrsApi.ir/Api/Market/'
const API_KEY = 'B9QnSJaGl6ihbW6PEDz2qypIb6V1d7Nu'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000 
})


export default api
