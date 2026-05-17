// src/api/products.js
export const getProduct = async (axios, barcode) => {
  const res = await axios.get(`/api/v1/products/${barcode}/`);
  return res.data;
};

export const updateProduct = async (axios, barcode, payload) => {
  const res = await axios.put(`/api/v1/products/${barcode}/`, payload);
  return res.data;
};
