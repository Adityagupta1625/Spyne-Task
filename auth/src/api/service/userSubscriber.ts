import { UserCRUD } from '../crud'
import { UserModel } from '../models'
import { ISubscriberService, SubscriberService } from './subscriber'
import { IUserService, UserService } from './user'

interface IUserSubscriber extends ISubscriberService{
    handleUser(message: string): Promise<void> 
}

class UserSubscriber extends SubscriberService {
  private userService: IUserService

  constructor() {
    super()
    const userCRUD = new UserCRUD(UserModel)
    this.userService = new UserService(userCRUD)
  }

  public async handleUser(message: string): Promise<void> {
    try {
      const subMessage: {
        type: string
        data: any
        id: string
      } = JSON.parse(message)

      if(subMessage.type==='UPDATE'){
        await this.userService.updateUser(subMessage.id,subMessage.data)
      }
      else if(subMessage.type==='DELETE'){
        await this.userService.deleteUser(subMessage.id)
      }
      
    } catch (e) {
      console.log(e)
    }
  }
}

export {
    IUserSubscriber,
    UserSubscriber
}