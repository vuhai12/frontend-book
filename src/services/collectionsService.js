import axiosConfig from "../axiosConfig";

export const apiGetCollections = () => axiosConfig.get("/get-collections");
