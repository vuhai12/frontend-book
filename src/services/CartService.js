import axiosConfig from "../axiosConfig";

export const apiAddCart = (data) => axiosConfig.post(`/cart`, data);

export const apiGetCart = () => axiosConfig.get(`/cart`);

export const apiGetBookInCartChecked = () => axiosConfig.get(`/cart/checked`);

export const apiCheckedBookCart = (data) => axiosConfig.put("/cart", data);

export const apiCheckedAllBookCart = (data) =>
  axiosConfig.put("/cart/checked-all", data);

export const apiQuantityBookInCart = (data) =>
  axiosConfig.put("/cart/quantity", data);

export const apiDeleteBookInCart = (id) =>
  axiosConfig.delete(`/cart`, { params: { bookCartId: id } });

export const apiDeleteAllBookCart = () =>
  axiosConfig.delete(`/cart/checked-all`);
