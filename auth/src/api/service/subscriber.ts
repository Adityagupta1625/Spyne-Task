import { createClient,RedisClientType } from 'redis'

interface ISubscriberService{
    subscribeToChannel(channelName: string): void
    listenToChannel(): string | null
}

class SubscriberService implements ISubscriberService {

   private subscriber: RedisClientType

  constructor(){
    const subscriber = createClient({
      url: process.env.REDIS_URL,
    }) as RedisClientType

    subscriber.on('connect', () => {
      console.log('connected to Subscriber')
    })

    subscriber.on('error', (err) => {
      console.error('Subscriber error:', err)
    })

    this.subscriber=subscriber
  }

  public subscribeToChannel(channelName: string): void {
   
    this.subscriber.subscribe(channelName,()=>{})
  }

  public listenToChannel(): string | null{
    let data: string | null= null

    this.subscriber.on('message',(channel: string,message: string)=>{
        console.log("Message: "+ message + "on channel: " + channel + "is arrive!");
        data=message
    })

    return data
  }
}

export {
    SubscriberService,
    ISubscriberService
}
