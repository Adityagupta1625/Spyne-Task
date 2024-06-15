import { HttpException } from "../../utils";
import { ILikeCRUD } from "../crud";
import { ILike } from "../interface";

interface ILikeService{
    addLike(data: Partial<ILike>): Promise<void>
}

class LikeService implements ILikeService{
    private readonly likeCRUD: ILikeCRUD

    constructor(likeCRUD: ILikeCRUD){
        this.likeCRUD=likeCRUD
    }

    public async addLike(data: Partial<ILike>): Promise<void>{
        try{
            await this.likeCRUD.add(data)
        }
        catch (e) {
            throw new HttpException(e?.errorCode, e?.message)
        }
    }
}

export {
    LikeService,
    ILikeService
}