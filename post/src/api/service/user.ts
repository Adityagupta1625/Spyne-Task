import { HttpException } from '../../utils'
import { IUserCRUD } from '../crud'
import { IUser } from '../interface'

interface IUserService {
  addUser(data: Partial<IUser>): Promise<void>

  updateUser(userId: string, data: Partial<IUser>): Promise<IUser>
  deleteUser(userId: string): Promise<void>
}

class UserService implements IUserService {
  private readonly userCRUD: IUserCRUD

  constructor(userCRUD: IUserCRUD) {
    this.userCRUD = userCRUD
  }

  public async addUser(data: Partial<IUser>): Promise<void> {
    try {
      await this.userCRUD.add(data)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async updateUser(
    userId: string,
    data: Partial<IUser>
  ): Promise<IUser> {
    try {
      const result = await this.userCRUD.updateOne({ id: userId }, data)

      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async deleteUser(userId: string): Promise<void> {
    try {
      await this.userCRUD.deleteOne({ id: userId })
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { UserService, IUserService }
