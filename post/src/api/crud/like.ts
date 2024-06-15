import { CRUDBase } from '../../utils'
import { ICRUDBase } from '../../utils/baseCrud'
import { ILike } from '../interface'
import { Model } from 'mongoose'

interface ILikeCRUD extends ICRUDBase<ILike> {}

class LikeCRUD extends CRUDBase<ILike> implements ILikeCRUD {
  constructor(Like: Model<ILike>) {
    super(Like)
  }
}

export { LikeCRUD, ILikeCRUD }
