import axios from "axios";


const axiosInstance = axios.create({
  baseURL:  import.meta.env.VITE_BASE_URI || 60 * 1000,
    withCredentials: true,
});

export default axiosInstance;