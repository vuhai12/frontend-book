import axiosConfig from "../axiosConfig";

export const getReviewsApi = async (productHandle) => {
  const response = await axiosConfig.get("/reviews", {
    params: { productHandle },
  });

  return response;
};

export const postReviewsApi = async (payload) => {
  const response = await axiosConfig.post("/reviews", payload);

  return response.data;
};
