import { Router } from "express";
import discussionRouter from "./discussion";
import commentsRouter from "./comment";
import likesRouter from "./like";
import { validateToken } from "../middleware/validateToken";
const apiRouter=Router()

apiRouter.use('/discussion',validateToken,discussionRouter)
apiRouter.use('/like',validateToken,likesRouter)
apiRouter.use('/comment',validateToken,commentsRouter)

export default apiRouter