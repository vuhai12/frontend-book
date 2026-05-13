import axiosConfig from "../axiosConfig";

export const apiAddCart = async (cartId, lines) => {
  const res = await axiosConfig.post("/add-cart", {
    cartId,
    lines,
  });

  console.log("res", res);

  return res;
};

export const apiGetCart = async (cartId) => {
  const res = await axiosConfig.get("/get-cart", {
    params: {
      cartId,
    },
  });

  return res;
};

export const apiRemoveCartLines = async (cartId, lineIds) => {
  const res = await axiosConfig.post("/remove-cart-lines", {
    cartId,
    lineIds,
  });

  return res;
};
