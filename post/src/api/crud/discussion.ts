import { Model } from 'mongoose'
import { CRUDBase, HttpException } from '../../utils'
import { ICRUDBase } from '../../utils/baseCrud'
import { IDiscussion } from '../interface'

interface IDiscussionCRUD extends ICRUDBase<IDiscussion> {}

class DiscussionCRUD extends CRUDBase<IDiscussion> implements IDiscussionCRUD {
  constructor(Discussion: Model<IDiscussion>) {
    super(Discussion)
  }

}

export { DiscussionCRUD, IDiscussionCRUD }