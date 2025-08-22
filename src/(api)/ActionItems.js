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


export const actionGetAll = async (page,size) => {
  try {
    const response = await axiosInstance.get(`/actionItems/getAllActionItems?page=${page}&size=1${size}`);   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateAction = async (data) => {
  try {
    const response = await axiosInstance.put('/actionItems/updateActionItems',data);   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteAction = async (aid) => {
  try {
    const response = await axiosInstance.delete(`/actionItems/deleteActionItems?aId=${aid}`);   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

