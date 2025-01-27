import axiosConfig from "../axiosConfig";

export const apiRegister = (email, password, name) =>
  axiosConfig.post("/auth/register", { email, password, name });

export const apiLogin = (email, password) =>
  axiosConfig.post("/auth/login", {
    email,
    password,
  });
