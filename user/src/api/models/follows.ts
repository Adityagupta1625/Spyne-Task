import { IFollows } from "../interface";
import mongoose, {Schema,model} from 'mongoose'

const followsSchema=new Schema<IFollows>({
    followeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    followerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
})

const FollowerModel=model<IFollows>('follows',followsSchema)
export default FollowerModel