import axiosConfig from "../axiosConfig";

export const apiDeleteBook = (id) =>
  axiosConfig.delete(`/book`, { params: { bids: id } });

export const apiUpdateBook = (data) => axiosConfig.put("/book", data);

export const apiCreateBook = (data) => axiosConfig.post("/book", data);

export const apiGetBook = (param) => {
  const {
    limitListBook,
    pageCurent,
    searchString,
    category,
    field,
    sort,
    signal,
  } = param;
  if (category) {
    return axiosConfig.get(
      `/book?limit=${limitListBook}&page=${pageCurent}&name=${searchString}&category_code=${category}`,
      { signal }
    );
  } else if (field && sort) {
    return axiosConfig.get(
      `/book?limit=${limitListBook}&page=${pageCurent}&order[]=${field}&order[]=${sort}`,
      { signal }
    );
  } else {
    return axiosConfig.get(
      `/book?limit=${limitListBook}&page=${pageCurent}&name=${searchString}`,
      { signal }
    );
  }
};

export const apiGetBookById = (id) => axiosConfig.get(`/book-${id}`);
