import axios from 'axios';

const baseUrl = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

export default baseUrl;