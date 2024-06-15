import { responseHandler,errorHandler, BaseValidator } from '../../utils'
import { Request,Response } from 'express'
import { IFollowsService } from '../service'
import { Schema } from 'ajv'

interface IFollowsController {
    followUserController(req: Request,res: Response): Promise<Response>
}

class FollowsController implements IFollowsController {
  private readonly followsService: IFollowsService
  private readonly followsDTOSchema: Schema

  constructor(followsService: IFollowsService,followsDTOSchema: Schema) {
    this.followsService = followsService
    this.followsDTOSchema=followsDTOSchema
  }

  public async followUserController(req: Request,res: Response): Promise<Response>{
    try{

        const validator=new BaseValidator(this.followsDTOSchema)
        validator.validateInput(req.body)

        await this.followsService.followUser(req.query.userId as string,req.body.followeeId)

        return responseHandler(200,res,'Followed Successfully!!',null)
    }
    catch(e){
        return errorHandler(e,res)
    }
  }
 
}

export {FollowsController }
