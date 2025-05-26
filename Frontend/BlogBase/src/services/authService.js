import api from '../api';

export const login = async (payload) => {
    const config = {};
    let encoded, response;

    // Only add headers if payload is not empty
    if (payload?.username && payload?.password) {
        encoded = btoa(`${payload.username}:${payload.password}`);
        config.headers = {
            Authorization: `Basic ${encoded}`,
        };
        response = await api.get('/user/login', config);
        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data));
            sessionStorage.setItem("auth", encoded);
        }
    } else {
        response = await api.get('/user/login', config);
        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
    }
    return response.data;
};

export const signup = async (payload) => {
    const response = await api.post('/user/createUser', payload);
    let encoded = btoa(`${payload.username}:${payload.password}`);
    if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data));
        sessionStorage.setItem("auth", encoded);
    }
    return response.data;
};
