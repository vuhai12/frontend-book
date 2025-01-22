import axiosConfig from "../axiosConfig";

export const apiRegister = (email, password) =>
  axiosConfig.post("/auth/register", { email, password });

export const apiLogin = (email, password) =>
  axiosConfig.post("/auth/login", {
    email,
    password,
  });
