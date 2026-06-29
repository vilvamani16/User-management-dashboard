import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,

    headers: {
        "Content-Type": "application/json",
    },
});

export const getAllUser = async () => {
    const response = await API.get("/");
    return response.data;
};

export const getSingleUser = async (id) => {
    const response = await API.get(`/${id}`);
    return response.data;
};

export const createUser = (userDetails) => (API.post("/", userDetails))

export const updateUser = (id, userDetails) => (API.put(`/${id}`, userDetails))

export const deleteUser = (id) => (API.delete(`/${id}`))