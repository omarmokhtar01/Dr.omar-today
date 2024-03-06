import axios from 'axios'


const baseUrl = axios.create({ baseURL: "https://tsquarehost.info/public/api/" })

export default baseUrl 