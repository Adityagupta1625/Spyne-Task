import { Schema,model } from "mongoose";
import { ILike } from "../interface";

const LikesSchema=new Schema<ILike>({
    createdOn: {
        type: Date,
        required: true,
        default: Date.now,
      },
      userId: {
        type: String,
        required: true,
      },
      discussionId: {
        type: String,
      },
      commentId: {
        type: String,
      },
})

const LikesModel=model<ILike>('Likes',LikesSchema)
export default LikesModel