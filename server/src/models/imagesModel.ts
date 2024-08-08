import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ImagesType extends Document {
    original_filename: string;
    secure_url: string;
}

const ImagesSchema: Schema = new Schema({
    original_filename: {
        type: String,
        required: true
    },
    secure_url: {
        type: String,
        required: true
    }
});

export const ImagesModel: Model<ImagesType> = mongoose.model<ImagesType>('ImagesExample', ImagesSchema);
