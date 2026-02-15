import axios from "axios"; //Importing the axios library to make HTTP requests to the backend API

export const api = axios.create({ //Creating an instance of axios with a base URL for the backend API
  baseURL: "http://localhost:5048/api",  //backend URL
});

api.interceptors.request.use((config) => { //Adding an interceptor to include the JWT token in the Authorization header of every request if the token exists in localStorage
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`; //Setting the Authorization header with the Bearer token if it exists
  return config;
});
