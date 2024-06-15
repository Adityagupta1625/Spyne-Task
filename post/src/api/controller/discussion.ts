import { HttpException, errorHandler,responseHandler } from "../../utils";
import { IDiscussionService } from "../service";
import { Request,Response } from "express";
import { BaseValidator } from "../../utils";
import { Schema } from "ajv";

interface IDiscussionController{
    createPostController(req: Request,res: Response): Promise<Response>
    updatePostController(req: Request,res: Response): Promise<Response>
    deletePostController(req: Request,res: Response): Promise<Response>
    getByTextController(req: Request,res: Response): Promise<Response>
    getByTagsController(req: Request,res: Response): Promise<Response>
}

class DiscussionController implements IDiscussionController{
    private readonly discussionService: IDiscussionService
    private readonly createPostDTOSchema: Schema
    private readonly updatePostDTOSchema: Schema

    constructor(discussionService: IDiscussionService,createPostDTOSchema: Schema,updatePostDTOSchema: Schema){
        this.createPostDTOSchema=createPostDTOSchema
        this.updatePostDTOSchema=updatePostDTOSchema
        this.discussionService=discussionService
    }

    public async createPostController(req: Request,res: Response): Promise<Response>{
        try{
            const validator=new BaseValidator(this.createPostDTOSchema)
            validator.validateInput(req.body)

            const resp=await this.discussionService.createPost({...req.body,userId: req.query.userId})
            
            return responseHandler(201,res,'Post Created Successfully!!',{id: resp})
        }
        catch(e){
            return errorHandler(e,res)
        }
    }

    public async updatePostController(req: Request,res: Response): Promise<Response>{
        try{
            const validator=new BaseValidator(this.updatePostDTOSchema)
            validator.validateInput(req.body)

            if(typeof req.params?.id!=='string')
                throw new HttpException(400,'Missing id!!')

            const resp=await this.discussionService.updatePost(req.params.id,req.body)
            
            return responseHandler(200,res,'Post Updated Successfully!!', resp)
        }
        catch(e){
            return errorHandler(e,res)
        }
    }

    public async deletePostController(req: Request,res: Response): Promise<Response>{
        try{
            
            if(typeof req.params?.id!=='string')
                throw new HttpException(400,'Missing id!!')

            const resp=await this.discussionService.deletePost(req.params.id)
            
            return responseHandler(204,res,'Post Deleted Successfully!!', resp)
        }
        catch(e){
            return errorHandler(e,res)
        }
    }

    public async getByTagsController(req: Request,res: Response): Promise<Response>{
        try{
            
            if(typeof req.query?.tags!=='string')
                throw new HttpException(400,'Missing tags!!')

            let tags=req.query.tags.split(',')
            const resp=await this.discussionService.searchByTags(tags)

        
            return responseHandler(200,res,'Post Fetched Successfully!!', resp)
        }
        catch(e){
            return errorHandler(e,res)
        }
    }

    public async getByTextController(req: Request,res: Response): Promise<Response>{
        try{
            
            if(typeof req.query?.text!=='string')
                throw new HttpException(400,'Missing tags!!')

            const resp=await this.discussionService.searchByText(req.query.text)        
            return responseHandler(200,res,'Post Fetched Successfully!!', resp)
        }
        catch(e){
            return errorHandler(e,res)
        }
    }
}

export {
    DiscussionController
}