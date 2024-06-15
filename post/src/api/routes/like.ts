import { LikesController } from '../controller'
import { LikeService } from '../service'
import { LikeCRUD } from '../crud'
import { LikesModel } from '../models'
import { Router } from 'express'
import { postLikesDTOSchema, commentLikesDTOSchema } from '../validator'

const likeCRUD = new LikeCRUD(LikesModel)
const likeService = new LikeService(likeCRUD)
const likeController = new LikesController(
  likeService,
  postLikesDTOSchema,
  commentLikesDTOSchema
)

const likesRouter = Router()

likesRouter.post(
  '/post',
  likeController.postLikeController.bind(likeController)
)

likesRouter.post(
  '/comment',
  likeController.commentLikeController.bind(likeController)
)

export default likesRouter