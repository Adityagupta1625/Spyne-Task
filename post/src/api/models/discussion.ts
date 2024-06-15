import { Schema,model } from "mongoose";
import { IDiscussion } from "../interface";

const DiscussionSchema = new Schema<IDiscussion>({
    text: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
      },
      hashtag: {
        type: [String]
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
});

const DiscussionModel=model<IDiscussion>('Discussion', DiscussionSchema);
export default DiscussionModel