import  { createClient,RedisClientType } from 'redis'

interface IPublishService {
    publishMessage(channelName: string,message:{type: string,data: any,id: string}): void
}

class PublisherService implements IPublishService {
  private publisher: RedisClientType

  constructor() {
    const publisher = createClient({
      url: process.env.REDIS_URL,
    }) as RedisClientType

    publisher.on('connect', () => {
      console.log('connected to publisher')
    })

    publisher.on('error', (err) => {
      console.error('Publisher error:', err)
    })

    this.publisher = publisher
  }

  public publishMessage(channelName: string,message:{type: string,data: any,id: string}): void {
    try {

      this.publisher.publish(channelName, JSON.stringify(message))
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }
}

export { PublisherService, IPublishService }
