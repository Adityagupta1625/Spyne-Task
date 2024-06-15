import { DiscussionController } from '../controller'
import { DiscussionService } from '../service'
import { DiscussionCRUD } from '../crud'
import { DiscussionModel } from '../models'
import { createPostDTOSchema, updatePostDTOSchema } from '../validator'
import { Router } from 'express'

const discussionCRUD = new DiscussionCRUD(DiscussionModel)
const discussionService = new DiscussionService(discussionCRUD)
const discussionController = new DiscussionController(
  discussionService,
  createPostDTOSchema,
  updatePostDTOSchema
)
const discussionRouter = Router()

discussionRouter.post(
  '/',
  discussionController.createPostController.bind(discussionController)
)

discussionRouter.get(
  '/text',
  discussionController.getByTextController.bind(discussionController)
)

discussionRouter.get(
  '/tags',
  discussionController.getByTagsController.bind(discussionController)
)

discussionRouter.put(
  '/:id',
  discussionController.updatePostController.bind(discussionController)
)

discussionRouter.delete(
  '/:id',
  discussionController.deletePostController.bind(discussionController)
)

export default discussionRouter
