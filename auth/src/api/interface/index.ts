import { Document } from "mongoose"

export interface IUser extends  Document{
    name: string
    mobileNo: string
    email: string
    password: string
}


