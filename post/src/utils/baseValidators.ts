import Ajv, { type Schema } from 'ajv'
import HttpException from './HttpException'

export class BaseValidator {
  private readonly schemaObj: Schema

  constructor(schemaObj: Schema) {
    this.schemaObj = schemaObj
  }

  public validateInput(data: any): void {
    try {
      const ajv = new Ajv()
      const validate = ajv.compile(this.schemaObj)
      const valid = validate(data)
      if(!valid){
        const validationError = validate.errors?.map((message) => {
          return message.message ?? ''
        })

        let validationResponse: string = 'Schema is invalid'

        if (validationError !== undefined) {
          validationResponse = validationError.join(',')
        }

        throw new HttpException(
          400,
          validationResponse
        )
      }
    } catch (e: any) {
      throw new HttpException(e?.errorCode,e?.message)
    }
  }
}
