import { HttpException } from '../../utils'
import { ICommentCRUD } from '../crud'
import { IComment } from '../interface'

interface ICommentService {
  addComment(data: Partial<IComment>): Promise<void>
  updateComment(id: string, text: string): Promise<IComment>
  deleteComment(id: string): Promise<void>
}

class CommentService implements ICommentService {
  private readonly CommentCRUD: ICommentCRUD

  constructor(CommentCRUD: ICommentCRUD) {
    this.CommentCRUD = CommentCRUD
  }

  public async addComment(data: Partial<IComment>): Promise<void> {
    try {
      await this.CommentCRUD.add(data)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async updateComment(id: string, text: string): Promise<IComment> {
    try {
      const resp = await this.CommentCRUD.updateOne({ _id: id }, { text: text })
      return resp
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async deleteComment(id: string): Promise<void> {
    try {
      await this.CommentCRUD.deleteOne({id: id})
      
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { CommentService, ICommentService }