import axiosConfig from "../axiosConfig";

export const apiGetOrders = () => axiosConfig.get(`/order`);

export const apiGetOrderById = () => axiosConfig.get(`/order/id`);

export const apiCreateOrder = (data) => axiosConfig.post("/order", data);

export const apiCreatePaymentWithVnpay = (data) =>
  axiosConfig.post("/payment/create_payment_url", data);
