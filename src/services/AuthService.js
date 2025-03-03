import axiosConfig from "../axiosConfig";

export const apiRegister = (email, password, name) =>
  axiosConfig.post("/auth/register", { email, password, name });

export const apiLogin = (email, password) =>
  axiosConfig.post("/auth/login", {
    email,
    password,
  });

export const apirequestPasswordReset = (email) =>
  axiosConfig.post("/auth/forgot-password", {
    email,
  });

export const apiResetPassword = (token, newPassword) =>
  axiosConfig.post("/auth/reset-password", {
    token,
    newPassword,
  });
