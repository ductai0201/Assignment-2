export interface IUser{
    email: string,
    password: number|string
}

export interface IRegister{
    name: string,
    email: string,
    password: string|number,
    confirmPassword?: string|number
}