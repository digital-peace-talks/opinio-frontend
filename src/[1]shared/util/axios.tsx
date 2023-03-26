import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4080',
})

export default axiosInstance