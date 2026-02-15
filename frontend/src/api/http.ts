import axios from "axios";

export const http = axios.create({ //Creating an instance of axios with a base URL for the backend API
  baseURL: "http://localhost:5048", 
});

http.interceptors.request.use((config) => { //Adding an interceptor to include the JWT token in the Authorization header of every request if the token exists in localStorage
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
