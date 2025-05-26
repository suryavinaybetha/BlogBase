import api from "../api.js";

export const addBlog = async (payload) => {
    const response = await api.post('/blog/addBlog', payload);
    return response.data;
};

export const updateBlog = async (payload) => {
    const response = await api.post('/blog/updateBlog', payload);
    return response.data;
}

export const publishBlog = async (payload) => {
    const response = await api.put('/blog/publishBlog/' + payload);
    return response.data;
}

export const unPublishBlog = async (payload) => {
    const response = await api.put('/blog/unPublishBlog/' + payload);
    return response.data;
}

export const deleteBlog = async (payload) => {
    const response = await api.delete('/blog/deleteBlog/' + payload);
    return response.data;
}
