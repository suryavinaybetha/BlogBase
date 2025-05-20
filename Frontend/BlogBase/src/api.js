import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    // withCredentials: true, // include cookies if needed
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    // Only add auth header if not already present
    if (!config.headers.Authorization) {
        const auth = sessionStorage.getItem("auth");
        if (auth) {
            config.headers.Authorization = "Basic " + auth;
        }
    }
    return config;
});

export default api;
