import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../../utils'
import { IUser } from '../interface'
import { UserModel } from '../models'
import { UserCRUD } from '../crud'

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers?.authorization

    if (token === null || token === undefined) {
      res.status(401).json({ message: 'Token not found' })
      return
    }

    jwt.verify(
      token.split(' ')[1],
      process.env.SECRET as string,
      (err, decoded: any) => {
        if (err !== null) {
          res.status(401).json({ message: 'Invalid Token!!' })
          return
        } else {
          const id: string = decoded?.id
          const userCRUD=new UserCRUD(UserModel)
          const user: Promise<IUser | null> = userCRUD.findOne({ _id: id })
          user
            .then((result) => {
              if (result === null) {
                res
                  .send(404)
                  .json({
                    message: 'User Not Found!!',
                    data: null,
                    status: 'Error',
                  })
              } else {
                req.query.userId = id
                next()
              }
            })
            .catch((e) => {
              errorHandler(e, res)
            })
        }
      }
    )
  } catch (e) {
    errorHandler(e, res)
  }
}
