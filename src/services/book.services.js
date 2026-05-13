import axiosConfig from "../axiosConfig";

export const apiGetBooks = (data) => axiosConfig.post("/get-books", data);

export const apiGetBookItem = (data) => axiosConfig.post("/get-book-detail", data);

