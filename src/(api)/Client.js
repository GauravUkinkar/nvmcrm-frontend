import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });


export const clientGetAll = async () => {
  try {
    const response = await axiosInstance.get('/client/getAllClient');   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateClient = async (data) => {
  try {
    const response = await axiosInstance.put('/client/updateClient',data);   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

