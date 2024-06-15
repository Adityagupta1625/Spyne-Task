import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({ debug: true })

import express, { type Request, type Response } from 'express'
import {ConnectToMongo} from './config'
import apiRouter from './api/routes'
import {UserSubscriber} from './api/service'

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userSubscriber = new UserSubscriber()
userSubscriber.subscribeToChannel('user')
const data = userSubscriber.listenToChannel()
if (data !== null) {
  userSubscriber.handleUser(data)
}

const PORT = 8003

app.use('/api',apiRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world')
})

app.get('*', (req: Request, res: Response) => {
  res.status(403).send('Sorry, the page you requested was not found.')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
  ConnectToMongo()
})

process.on('uncaughtException', (err: any) => {
  console.error(err)
  process.exit(1)
})

process.on('unhandledRejection', (err: any) => {
  console.error(err)
  process.exit(1)
})