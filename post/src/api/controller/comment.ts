import { Schema } from "ajv";
import { ICommentService } from "../service";
import { Request,Response } from "express";
import { BaseValidator, HttpException, errorHandler,responseHandler } from "../../utils";

interface ICommentsController{
    postCommentController(req: Request,res: Response): Promise<Response>
    replyCommentController(req: Request,res: Response): Promise<Response>
    updateCommentController(req: Request,res: Response): Promise<Response>
    deleteCommentController(req: Request,res: Response): Promise<Response>
}

class CommentsController implements ICommentsController{

    private readonly CommentsService: ICommentService
    private readonly postCommentsDTOSchema: Schema
    private readonly replyCommentsDTOSchema: Schema
    private readonly updateCommentsDTOSchema: Schema

    constructor(CommentsService: ICommentService,postCommentsDTOSchema: Schema,replyCommentsDTOSchema: Schema,updateCommentDTOSchema: Schema){
        this.CommentsService=CommentsService
        this.postCommentsDTOSchema=postCommentsDTOSchema
        this.replyCommentsDTOSchema=replyCommentsDTOSchema
        this.updateCommentsDTOSchema=updateCommentDTOSchema
    }

    public async postCommentController(req: Request,res: Response): Promise<Response>{
        try{

            const validator=new BaseValidator(this.postCommentsDTOSchema)
            validator.validateInput(req.body)

            await this.CommentsService.addComment({
                userId: req.query.userId as string,
                discussionId: req.body.discussionId,
                text: req.body.text
            })

            return responseHandler(201,res,'Comment added!!',null)
        }
        catch(e){
            return errorHandler(e,res)
        }
    }

    public async replyCommentController(req: Request,res: Response): Promise<Response>{
        try{

            const validator=new BaseValidator(this.replyCommentsDTOSchema)
            validator.validateInput(req.body)

            await this.CommentsService.addComment({text: req.body.text,userId: req.query.userId as string,parentId: req.body.commentId})

            return responseHandler(201,res,'Comment added!!',null)
        }
        catch(e){
            return errorHandler(e,res)
        }
    }

    public async deleteCommentController(req: Request,res: Response): Promise<Response>{
        try{

            if(typeof req.params?.id!=='string'){
                throw new HttpException(400,'Id not provided!!')
            }

            await this.CommentsService.deleteComment(req.params.id)

            return responseHandler(204,res,'Comment deleted!!',null)
        }
        catch(e){
            return errorHandler(e,res)
        }
    }

    public async updateCommentController(req: Request,res: Response): Promise<Response>{
        try{

            const validator=new BaseValidator(this.updateCommentsDTOSchema)
            validator.validateInput(req.body)

            if(typeof req.params?.id!=='string'){
                throw new HttpException(400,'Id not provided!!')
            }

            const data=await this.CommentsService.updateComment(req.params.id,req.body.text)

            return responseHandler(200,res,'Comment updated!!',data)
        }
        catch(e){
            return errorHandler(e,res)
        }
    }
    
}

export {
    CommentsController
}