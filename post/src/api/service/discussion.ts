import { HttpException } from '../../utils'
import { IDiscussionCRUD } from '../crud'
import { IDiscussion } from '../interface'

interface IDiscussionService{
    createPost(postData: Partial<IDiscussion>): Promise<string>
    updatePost(id: string,postData: Partial<IDiscussion>): Promise<IDiscussion>
    deletePost(postId: string): Promise<void>
    searchByTags(tags: string[]): Promise<IDiscussion[]>
    searchByText(text: string): Promise<IDiscussion[]>
}

class DiscussionService implements IDiscussionService{
    private readonly discussionCRUD: IDiscussionCRUD

    constructor(discussionCRUD: IDiscussionCRUD){
        this.discussionCRUD=discussionCRUD
    }
    
    public async createPost(postData: Partial<IDiscussion>): Promise<string>{
        try{
            const data=await this.discussionCRUD.add(postData)
            return data.id
        }
        catch (e) {
            throw new HttpException(e?.errorCode, e?.message)
        }
    }

    public async updatePost(id: string,postData: Partial<IDiscussion>): Promise<IDiscussion>{
        try{
            const data=await this.discussionCRUD.updateOne({_id: id},postData)
            return data
        }
        catch (e) {
            throw new HttpException(e?.errorCode, e?.message)
        }
    }

    public async deletePost(postId: string): Promise<void>{
        try{
            await this.discussionCRUD.deleteOne({id: postId})
        }
        catch (e) {
            throw new HttpException(e?.errorCode, e?.message)
        }
    }

    public async searchByTags(tags: string[]): Promise<IDiscussion[]>{
        try{
            const data=await this.discussionCRUD.findAll({
                hashtag:{
                    $in: tags
                }
            })

            return data
        }
        catch (e) {
            throw new HttpException(e?.errorCode, e?.message)
        }
    }

    public async searchByText(text: string): Promise<IDiscussion[]>{
        try{
            const data=await this.discussionCRUD.findAll({
                text: text
            })

            return data
        }
        catch (e) {
            throw new HttpException(e?.errorCode, e?.message)
        }
    }
}

export {
    DiscussionService,
    IDiscussionService
}