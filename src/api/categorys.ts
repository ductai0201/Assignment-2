import instance from "./instance";
import { ICategory } from "../types/categorys";

const {
  data: { accessToken },
} = JSON.parse(localStorage.getItem("_user")!);

export const getAllCategory = () => {
  return instance.get("/categorys");
};

export const getOneCategory = (id: number | string) => {
  return instance.get("/categorys/" + id);
};

export const createCategory = (category: ICategory) => {
  return instance.post("/categorys/add", category, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const removeCategory = (id: number | string) => {
  return instance.delete("/categorys/" + id, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateCategory = (category: ICategory) => {
  return instance.patch(`/categorys/${category._id}`, category, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
