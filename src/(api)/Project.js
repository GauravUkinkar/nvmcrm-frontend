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


export const projectsGetAll = async () => {
  try {
    const response = await axiosInstance.get('/project/getAllProjects');   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const projectsAdd = async (data) => {
  try {
    const response = await axiosInstance.post('/project/addProject', {
          "projectName": data
    });   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateProject = async (data) => {
  try {
    const response = await axiosInstance.put('/project/updateProject',data);   
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


