import axiosConfig from "../axiosConfig";

export const apiGetUsers = (limit, currentPage, searchString, field, sort) => {
  let url = `/user?limit=${limit}&page=${currentPage}`;
  if (searchString) url += `&name=${searchString}`;
  if (field && sort) url += `&order[]=${field}&order[]=${sort}`;
  return axiosConfig.get(url);
};

export const apiGetUserById = () => {
  return axiosConfig.get(`/user/me`);
};

export const apiCreateUser = (data) => axiosConfig.post("/user", data);

export const apiUpdateUser = (data) => axiosConfig.put("/user", data);

export const apiUpdateCurrentUser = (data) => axiosConfig.put("/user/me", data);

export const apiDeleteUser = (userId) => axiosConfig.delete(`/user/${userId}`);

export const apiLogout = () => axiosConfig.post("/auth/logout");
