import { HttpException } from '../../utils'
import { IUserCRUD } from '../crud'
import { LoginDTO, SignUpDTO } from '../types'
import bcrypt, { compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IPublishService } from './publisher'

interface IAuthService {
  signUp(signUpData: SignUpDTO): Promise<string>
  login(loginData: LoginDTO): Promise<string>
}

class AuthService implements IAuthService {
  private readonly userCRUD: IUserCRUD
  private readonly publishService: IPublishService

  constructor(userCRUD: IUserCRUD,publishService: IPublishService) {
    this.userCRUD = userCRUD
    this.publishService=publishService
  }

  public async signUp(signUpData: SignUpDTO): Promise<string> {
    try {
      const { email, password, mobileNo, name } = signUpData
      const hashedPassword = bcrypt.hashSync(password, 10)

      const userData={
        email: email,
        password: hashedPassword,
        mobileNo: mobileNo,
        name: name,
      }

      const data = await this.userCRUD.add(userData)

      this.publishService.publishMessage('user',{type: 'INSERT',data: userData,id: ''})

      const token = jwt.sign({ id: data.id }, process.env.SECRET ?? '')

      return token
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async login(loginData: LoginDTO): Promise<string> {
    try {
      const { email, password } = loginData

      const user = await this.userCRUD.findOne({ email: email })

      if (user === null) {
        throw new HttpException(
          404,
          'User Does Not Exist!!'
        )
      }

      const isValid = compareSync(password,user.password)

      if (!isValid) {
        throw new HttpException(
          401,
          'Invalid Credentials!!'
        )
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET ?? '')

      return token
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export {
    AuthService,
    IAuthService
}