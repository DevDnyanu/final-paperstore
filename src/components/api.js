import axios from 'axios';

const API = axios.create({ baseURL: `${process.env.REACT_APP_API_BASE_URL}/api` });


export const uploadDocument = (formData) => API.post('/upload', formData);
export const signup = (userData) => {
    return API.post('/auth/signup', userData);  // Sending userData as the request body
  };
  export const login = (loginData) => {
    return API.post('/auth/login', loginData);  // Sending loginData (email and password) as the request body
  };