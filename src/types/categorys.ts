import { IProduct } from "./products"

export interface ICategory{
    map(arg0: (item: any, index: number) => JSX.Element): import("react").ReactNode
    _id: string|number,
    name: string 
}