import axiosConfig from "../axiosConfig";

export const apigetComments = (idBook, limit, pageCurrent) =>
  axiosConfig.get(
    `/comment/${idBook}?limit=${limit}&pageCurrent=${pageCurrent}`
  );
export const apicreateComment = (body) => axiosConfig.post(`/comment`, body);
export const apideleteComment = (idComment) =>
  axiosConfig.post(`/comment/${idComment}`);
