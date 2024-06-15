import { FollowsController } from "../controller";
import { FollowsService } from "../service";
import { FollowsCRUD } from "../crud";
import  {FollowerModel}  from "../models";
import { followsDTOSchema } from "../validator";
import { Router } from "express";

const followsCRUD=new FollowsCRUD(FollowerModel)
const followsService=new FollowsService(followsCRUD)
const followsController=new FollowsController(followsService,followsDTOSchema)
const followsRouter=Router()

followsRouter.post('/',followsController.followUserController.bind(followsController))


export default followsRouter