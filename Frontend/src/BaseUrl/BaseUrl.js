import axios from 'axios';

const baseUrl = axios.create({
    baseURL: 'https://foodview-backend-46jq.onrender.com',
    withCredentials: true
});

export default baseUrl;