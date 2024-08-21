import mongoose, { Schema, Document, Model } from 'mongoose';

export interface userType extends Document {
    name: string;
    email: string;
    password: string;
    pic?: string;
    isAdmin?: boolean;
}

const userSchema: Schema<userType> = new Schema<userType>(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        pic: {
            type: String,
            required: false,
        },
        isAdmin: {
            type: Boolean,
            required: false,
        },
    },
    { timestamps: true }
);

const UserModel: Model<userType> = mongoose.model<userType>('User', userSchema);

export default UserModel;
