import axiosConfig from "../axiosConfig";

export const apiGetUsers = (limit, currentPage, searchString, field, sort) => {
  let url = `/user?limit=${limit}&page=${currentPage}`;
  if (searchString) url += `&name=${searchString}`;
  if (field && sort) url += `&order[]=${field}&order[]=${sort}`;
  return axiosConfig.get(url);
};

export const apiGetUserById = () => {
  return axiosConfig.get(`/user/account`);
};

export const apiCreateUser = (data) => axiosConfig.post("/user", data);

export const apiUpdateUser = (data) => axiosConfig.put("/user", data);

export const apiDeleteUser = () => axiosConfig.delete(`/user`);

export const apiLogout = () => axiosConfig.post("/auth/logout");
