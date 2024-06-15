import { Schema } from "ajv";
import { ILikeService } from "../service";
import { Request,Response } from "express";
import { BaseValidator, errorHandler,responseHandler } from "../../utils";

interface ILikesController{
    postLikeController(req: Request,res: Response): Promise<Response>
    commentLikeController(req: Request,res: Response): Promise<Response>
}

class LikesController implements ILikesController{

    private readonly likesService: ILikeService
    private readonly postLikesDTOSchema: Schema
    private readonly commentLikesDTOSchema: Schema

    constructor(likesService: ILikeService,postLikesDTOSchema: Schema,commentLikesDTOSchema: Schema){
        this.likesService=likesService
        this.postLikesDTOSchema=postLikesDTOSchema
        this.commentLikesDTOSchema=commentLikesDTOSchema
    }

    public async postLikeController(req: Request,res: Response): Promise<Response>{
        try{

            const validator=new BaseValidator(this.postLikesDTOSchema)
            validator.validateInput(req.body)

            await this.likesService.addLike({discussionId: req.body.discussionId,userId:req.query.userId as string})

            return responseHandler(201,res,'Liked Post!!',null)
        }
        catch(e){
            return errorHandler(e,res)
        }
    }

    public async commentLikeController(req: Request,res: Response): Promise<Response>{
        try{

            const validator=new BaseValidator(this.commentLikesDTOSchema)
            validator.validateInput(req.body)

            await this.likesService.addLike({commentId: req.body.commentId,userId:req.query.userId as string})

            return responseHandler(201,res,'Liked Comment!!',null)
        }
        catch(e){
            return errorHandler(e,res)
        }
    }
    
}

export {
    LikesController
}