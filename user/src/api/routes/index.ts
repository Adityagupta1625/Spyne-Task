import { Router } from "express";
import userRouter from "./user";
import followsRouter from "./follows";
import { validateToken } from "../middleware/validateToken";
const apiRouter=Router()

apiRouter.use('/user',validateToken,userRouter)
apiRouter.use('/follow',validateToken,followsRouter)

export default apiRouter