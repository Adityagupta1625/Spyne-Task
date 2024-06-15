import { Document, ObjectId } from "mongoose"

export interface IUser extends  Document{
    id: string
    name: string
    mobileNo: string
    email: string
    password: string
}

export interface IFollows extends Document{
    followeeId: ObjectId
    followerId: ObjectId
}

