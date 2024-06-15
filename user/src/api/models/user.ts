import { Schema,model } from "mongoose";
import { IUser } from "../interface";

const UserSchema = new Schema({
    name: { type: String, required: true },
    mobileNo: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},{
    timestamps: true
});

const UserModel=model<IUser>('user', UserSchema);
export default UserModel