import axios from "axios";

const API_BASE = "http://localhost:3000";

const getToken = () => localStorage.getItem("token");

export const registerUser = (data) =>
  axios.post(`${API_BASE}/auth/register`, data);

export const loginUser = (data) => axios.post(`${API_BASE}/auth/login`, data);

export const getProducts = () =>
  axios.get(`${API_BASE}/products`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const addProduct = (data) =>
  axios
    .post(`${API_BASE}/products`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((res) => res.data);

export const deleteProduct = (id) =>
  axios.delete(`${API_BASE}/products/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
