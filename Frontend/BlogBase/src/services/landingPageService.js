import api from "../api.js"

export const allPublished = async () => {
    const response = await api.get('/user/public');
    return response.data;
};

export const publishedBlog = async (payload) => {
    const response = await api.get(`/blog/getBlog/${payload}/public`);
    return response.data;
};