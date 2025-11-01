import axios from 'axios';

const baseUrl = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: "https://foodview-backend-46jq.onrender.com",
    withCredentials: true
});

export default baseUrl;