import axios from "axios";

const BASE_URL = "http://localhost:3003/products";

export const getAllProduct = async () => axios.get(BASE_URL);
export const getProductById = async (id) => axios.get(`${BASE_URL}/${id}`);
export const deleteProduct = async (id) => axios.delete(`${BASE_URL}/${id}`);
export const addProduct = async (product) => axios.post(BASE_URL, product);
export const updateProduct = async (id, product) =>
  axios.put(`${BASE_URL}/${id}`, product);
