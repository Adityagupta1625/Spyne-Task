import { type Document, type Model, type FilterQuery } from 'mongoose'
import HttpException from './HttpException'

export interface ICRUDBase<T extends Document> {
  add: (data: Partial<T>) => Promise<T>
  findAll: (query: FilterQuery<T>) => Promise<T[]>
  findOne: (query: FilterQuery<T>) => Promise<T | null>
  updateAll: (query: FilterQuery<T>, data: Partial<T>) => Promise<void>
  updateOne: (query: FilterQuery<T>, data: Partial<T>) => Promise<T>
  deleteAll: (query: FilterQuery<T>) => Promise<void>
  deleteOne: (query: FilterQuery<T>) => Promise<void>
}

export abstract class CRUDBase<T extends Document>
  implements ICRUDBase<T>
{
  private readonly baseModel: Model<T>

  constructor(baseModel: Model<T>) {
    this.baseModel = baseModel
  }

  public async add(data: Partial<T>): Promise<T> {
    try {
      const resp = await this.baseModel.create(data)
      return resp
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }


  public async findAll(query: FilterQuery<T>): Promise<T[]> {
    try {
      const resp = await this.baseModel.find(query)
      return resp
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async findOne(query: FilterQuery<T>): Promise<T | null> {
    try {
      const data = await this.baseModel.findOne(query)
      if (data === null) throw new HttpException(400, 'Data Not Found!!')
      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async updateOne(query: FilterQuery<T>, data: Partial<T>): Promise<T> {
    try {
      const result = await this.baseModel.findOneAndUpdate(query, data, {
        new: true,
      })

      if (result === null) throw new HttpException(400, 'Resource not Found!!')

      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async updateAll(
    query: FilterQuery<T>,
    data: Partial<T>
  ): Promise<void> {
    try {
      await this.baseModel.updateMany(query, data)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async deleteOne(query: FilterQuery<T>): Promise<void> {
    try {
      await this.findOne(query)

      await this.baseModel.findOneAndDelete(query)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async deleteAll(query: FilterQuery<T>): Promise<void> {
    try {
      await this.baseModel.deleteMany(query)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}