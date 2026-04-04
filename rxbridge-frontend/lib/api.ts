import axios from 'axios'
const BASE = 'http://localhost:8000'
export const analyzeMedicines = (text: string) =>
  axios.post(BASE + '/api/analyze', { text: text })
export const getStores = () =>
  axios.get(BASE + '/api/locator')