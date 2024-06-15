import { CommentsController } from '../controller'
import { CommentService } from '../service'
import { CommentCRUD } from '../crud'
import { CommentsModel } from '../models'
import { Router } from 'express'
import {
  postCommentsDTOSchema,
  replyCommentsDTOSchema,
  updateCommentsDTOSchema,
} from '../validator'

const commentCRUD = new CommentCRUD(CommentsModel)
const commentService = new CommentService(commentCRUD)
const commentController = new CommentsController(
  commentService,
  postCommentsDTOSchema,
  replyCommentsDTOSchema,
  updateCommentsDTOSchema
)

const commentsRouter = Router()

commentsRouter.post(
  '/post',
  commentController.postCommentController.bind(commentController)
)

commentsRouter.post(
  '/reply',
  commentController.replyCommentController.bind(commentController)
)

commentsRouter.put(
  '/:id',
  commentController.updateCommentController.bind(commentController)
)

commentsRouter.delete(
  '/:id',
  commentController.deleteCommentController.bind(commentController)
)

export default commentsRouter