import { IProduct } from "../types/products";
import instance from "./instance";
const {
  data: { accessToken }
} = JSON.parse(localStorage.getItem("_user")!);

export const getAllProduct = () => {
  return instance.get("/products");
};

export const getOneProduct = (id: number | string) => {
  return instance.get("/products/" + id);
};

export const createProduct = (product: IProduct) => {
  return instance.post("/products/add", product, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const removeProduct = (id: number | string) => {
  return instance.delete("/products/" + id, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateProduct = (product: IProduct) => {
  
  return instance.patch(`/products/${product._id}`, product, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
