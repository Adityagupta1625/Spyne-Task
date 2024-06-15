import { AuthController } from "../controller";
import { AuthService,PublisherService } from "../service";
import { UserCRUD } from "../crud";
import  {UserModel}  from "../models";
import { loginDTOSchema,signUpDTOSchema } from "../validator";
import { Router } from "express";

const publishService=new PublisherService()
const userCRUD=new UserCRUD(UserModel)
const authService=new AuthService(userCRUD,publishService)
const authController=new AuthController(authService,loginDTOSchema,signUpDTOSchema)
const authRouter=Router()

authRouter.post('/login',authController.loginController.bind(authController))

authRouter.post('/signup',authController.signUpController.bind(authController))

export default authRouter