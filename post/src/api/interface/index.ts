import { Document } from "mongoose"

export interface IDiscussion extends  Document{
    text: string
    imageUrl?: string
    createdOn: Date
    userId: string
    hashtag: string[]
}

export interface ILike extends Document{
    createdOn: Date
    userId: string 
    discussionId?: string
    commentId?: string
}

export interface IComment extends Document{
    text: string;
    createdOn: Date;
    userId: string;
    discussionId?: string;
    parentId?: string | null;
}


export interface IUser extends  Document{
    id: string
    name: string
    mobileNo: string
    email: string
    password: string
}



