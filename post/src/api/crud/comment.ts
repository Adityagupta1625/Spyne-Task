import { CRUDBase } from '../../utils'
import { ICRUDBase } from '../../utils/baseCrud'
import { IComment } from '../interface'
import { Model } from 'mongoose'

interface ICommentCRUD extends ICRUDBase<IComment> {}

class CommentCRUD extends CRUDBase<IComment> implements ICommentCRUD {
  constructor(Comment: Model<IComment>) {
    super(Comment)
  }
}

export { CommentCRUD, ICommentCRUD }
