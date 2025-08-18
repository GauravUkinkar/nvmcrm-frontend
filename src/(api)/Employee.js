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

export const employeeGetAll = async () => {
  try {
    const response = await axiosInstance.get("/admin/getAllEmployee");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteEmployee = async (eid) => {
  try {
    const response = await axiosInstance.delete(
      `/admin/DeleteEmployee/{eId}?eId=${eid}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllEmployeeName = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}auth/getAllEmployeeNames`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
