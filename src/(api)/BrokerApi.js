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


export const brokerGetAll = async () => {
  try {
    const response = await axiosInstance.get('/broker/getAllBroker');   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateBroker = async (data) => {
  try {
    const response = await axiosInstance.post('/broker/updateBroker',data);   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteBroker = async (bId) => {
  try {
    const response = await axiosInstance.delete(`/broker/deleteBroker/{bId}?bId=${bId}`);   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
