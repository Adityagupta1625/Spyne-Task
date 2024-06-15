import { HttpException, errorHandler,responseHandler } from "../../utils";
import { IUserService } from "../service";
import { Request,Response } from "express";
import { BaseValidator } from "../../utils";
import { Schema } from "ajv";

interface IUserController {
    updateController(req: Request,res: Response): Promise<Response>
    deleteController(req: Request,res: Response): Promise<Response>
}

class UserController implements IUserController{
    
    private readonly userService: IUserService
    private readonly updateDTOSchema: Schema

    constructor(userService: IUserService,updateDTOSchema: Schema){
        this.userService=userService
        this.updateDTOSchema=updateDTOSchema
    }

    public async updateController(req: Request,res: Response): Promise<Response>{
        try{
            
            const validator=new BaseValidator(this.updateDTOSchema)
            validator.validateInput(req.body)

            const resp=await this.userService.updateUser(req.query.userId as string,req.body)
            
            return responseHandler(200,res,'Updated Successfully!!',resp)
        }
        catch(e){
            return errorHandler(e,res)
        }
    }

    public async deleteController(req: Request,res: Response): Promise<Response>{
        try{
         
            await this.userService.deleteUser(req.query.userId as string)

            return responseHandler(200,res,'Deleted Successfully!!',null)
        }
        catch(e){
            return errorHandler(e,res)
        }
    }
}

export {
    UserController
}