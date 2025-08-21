import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://chat-app-et71.onrender.com/api',
  withCredentials: true,
});