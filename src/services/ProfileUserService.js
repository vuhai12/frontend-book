import axiosConfig from "../axiosConfig";

export const apiGetProfileUser = () => axiosConfig.get(`/profile-user`);
