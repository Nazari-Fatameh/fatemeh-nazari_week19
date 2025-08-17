import axios from "axios";

const API_BASE = "http://localhost:3000";

export const registerUser = (data) => {
  return axios.post(`${API_BASE}/auth/register`, data);
};

export const loginUser = (data) => {
  return axios.post(`${API_BASE}/auth/login`, data);
};

export const getProducts = () => {
  return axios.get(`${API_BASE}/products`).then((res) => res.data);
};
export const addProducts = (data) => {
  return axios.post(`${API_BASE}/Products`, data).then((res) => res.data);
};
