import { IRegister, IUser } from "../types/user";
import instance from "./instance";

export const login = (user:IUser)=>{
    return instance.post('/signin',user)
}

export const register = (user:IRegister)=>{
    return instance.post('/signup',user)
}