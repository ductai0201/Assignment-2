import { ICategory } from "./categorys";
import { IProduct } from "./products";

export interface IOnAdd {
  onAdd: (product: IProduct) => void;
}

export interface IOnAddCate {
  onAddCate: (category: ICategory) => void;
}

export interface IOnUpdate {
  onUpdate: (id:number|string,product: IProduct) => void;
}

export interface IOnUpdateCate {
  onUpdateCate: (id:number|string,category: ICategory) => void;
}
