import { HttpException } from '../../utils'
import { IFollowsCRUD } from '../crud'
import { Schema } from 'mongoose'

interface IFollowsService {
    followUser(
        userId: string,
        followeeId: string
      ): Promise<void>
}

class FollowsService implements IFollowsService {
  private readonly FollowsCRUD: IFollowsCRUD

  constructor(FollowsCRUD: IFollowsCRUD) {
    this.FollowsCRUD = FollowsCRUD
  }

  public async followUser(
    userId: string,
    followeeId: string
  ): Promise<void> {
    try {
      
        const alreadyFollows=await this.FollowsCRUD.findOne({
            followeeId: followeeId,
            followerId: userId
        })

        if(alreadyFollows!==null){
            throw new HttpException(409,'Already Follows the User!!')
        }

        await this.FollowsCRUD.add({
            followeeId: new Schema.Types.ObjectId(followeeId),
            followerId: new Schema.Types.ObjectId(userId)
        })


    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  
}

export { FollowsService,IFollowsService }
