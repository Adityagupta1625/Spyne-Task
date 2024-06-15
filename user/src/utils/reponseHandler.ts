import { Response } from 'express'

export const responseHandler = async (
  statusCode: number,
  res: Response,
  message: string,
  data: any
): Promise<Response> => {
  
    return res
      .status(statusCode)
      .json({
        message: message,
        status: 'Success',
        data: data,
      })
}