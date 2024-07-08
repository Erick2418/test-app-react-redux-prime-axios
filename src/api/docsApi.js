import axios from "axios";
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables()

const docsApi = axios.create({
    baseURL:  VITE_API_URL,   
});


// Todo: configurar interceptores
docsApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };        
    }
    return config;
});


export default docsApi;