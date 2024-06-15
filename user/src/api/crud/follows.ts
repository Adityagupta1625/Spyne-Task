import { Model } from "mongoose";
import { CRUDBase } from "../../utils";
import { ICRUDBase } from "../../utils/baseCrud";
import { IFollows } from "../interface";

interface IFollowsCRUD extends ICRUDBase<IFollows>{}

class FollowsCRUD extends CRUDBase<IFollows> implements IFollowsCRUD{
    constructor(Follows: Model<IFollows>){
        super(Follows)
    }
}

export {
    FollowsCRUD,
    IFollowsCRUD
}