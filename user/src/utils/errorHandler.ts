import { Response } from 'express'
import HttpException from './HttpException'


export const errorHandler = async (
  e: any,
  res: Response
): Promise<Response> => {
  console.log("Error in controller--->",e)
  if (e instanceof HttpException)
    return res
      .status(e.errorCode)
      .json({ message: e.message, status: 'Error'})
  else
    return res
      .status(500)
      .json({
        message: e?.message ?? 'Internal Server Error',
        status: 'Error',
      })
}
