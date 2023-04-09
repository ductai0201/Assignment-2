import { IProduct } from "./products";

export interface IOnAdd {
  onAdd: (product: IProduct) => void;
}


export interface IOnUpdate {
  onUpdate: (id:number,product: IProduct) => void;
}
