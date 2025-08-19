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


export const bdTrackerGetAll = async () => {
  try {
    const response = await axiosInstance.get('auth/getAllBdTracker');   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateBDTracker = async (data) => {
  try {
    const response = await axiosInstance.put('/bdtracker/updateBDTracker',data);   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteBDTracker = async (bdId) => {
  try {
    const response = await axiosInstance.delete(`/bdtracker/deleteBDTracker?bId=${bdId}`);   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


