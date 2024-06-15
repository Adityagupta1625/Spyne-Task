import { Schema,model } from "mongoose";
import { IComment } from "../interface";

const CommentsSchema=new Schema<IComment>({
    text: {
        type: String,
        required: true,
      },
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
      parentId: {
        type: String,
        default: null,
      },
})

const CommentsModel=model<IComment>('Comments',CommentsSchema)
export default CommentsModel