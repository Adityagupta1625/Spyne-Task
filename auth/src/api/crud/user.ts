import { Model } from "mongoose";
import { CRUDBase } from "../../utils";
import { ICRUDBase } from "../../utils/baseCrud";
import { IUser } from "../interface";

interface IUserCRUD extends ICRUDBase<IUser>{}

class UserCRUD extends CRUDBase<IUser> implements IUserCRUD{
    constructor(User: Model<IUser>){
        super(User)
    }
}

export {
    UserCRUD,
    IUserCRUD
}