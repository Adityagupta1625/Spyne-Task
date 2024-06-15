import { errorHandler,responseHandler } from "../../utils";
import { IAuthService } from "../service";
import { Request,Response } from "express";
import { BaseValidator } from "../../utils";
import { Schema } from "ajv";

interface IAuthController {
    signUpController(req: Request,res: Response): Promise<Response>
    loginController(req: Request,res: Response): Promise<Response>
}

class AuthController implements IAuthController{
    
    private readonly authService: IAuthService
    private readonly loginDTOSchema: Schema
    private readonly signUpDTOSchema: Schema

    constructor(authService: IAuthService,loginDTOSchema: Schema,signUpDTOSchema: Schema){
        this.authService=authService
        this.loginDTOSchema=loginDTOSchema
        this.signUpDTOSchema=signUpDTOSchema
    }

    public async signUpController(req: Request,res: Response): Promise<Response>{
        try{
            
            const validator=new BaseValidator(this.signUpDTOSchema)
            validator.validateInput(req.body)

            const resp=await this.authService.signUp(req.body)
            
            return responseHandler(201,res,'Signup Successfully!!',{token: resp})
        }
        catch(e){
            return errorHandler(e,res)
        }
    }

    public async loginController(req: Request,res: Response): Promise<Response>{
        try{

            const validator=new BaseValidator(this.loginDTOSchema)
            validator.validateInput(req.body)

            const resp=await this.authService.login(req.body)
            
            return responseHandler(200,res,'Logged In Successfully!!',{token: resp})
        }
        catch(e){
            return errorHandler(e,res)
        }
    }
}

export {
    AuthController
}