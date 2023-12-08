import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://servidor-monitoramento-gipar.onrender.com',
})
