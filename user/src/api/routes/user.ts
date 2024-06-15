import { UserController } from "../controller";
import { UserService } from "../service";
import { UserCRUD } from "../crud";
import  {UserModel}  from "../models";
import { userDTOSchema } from "../validator";
import { Router } from "express";

const userCRUD=new UserCRUD(UserModel)
const userService=new UserService(userCRUD)
const userController=new UserController(userService,userDTOSchema)
const userRouter=Router()

userRouter.put('/',userController.updateController.bind(userController))

userRouter.delete('/',userController.deleteController.bind(userController))


export default userRouter