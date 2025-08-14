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


export const propertyGetAll = async () => {
  try {
    const response = await axiosInstance.get('/property/getallproperty');   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateProperties = async (data) => {
  try {
    const response = await axiosInstance.post('/property/updateproperty',data);   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


