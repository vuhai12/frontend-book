import axiosConfig from "../axiosConfig";

export const apitoggleLike = (commentId) =>
  axiosConfig.post(`/like`, { commentId });
