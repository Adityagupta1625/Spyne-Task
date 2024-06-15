import mongoose from 'mongoose'

export const ConnectToMongo = (): void => {
  mongoose
    .connect(process.env.MONGO_URI ?? '',{
      dbName: 'auth'
    })
    .then(() => {
      console.log('connected Successfully!!')
    })
    .catch((err) => {
      console.log('Error in connecting', err)
    })
}