import mongoose, { Schema, Document, Model } from 'mongoose';

export interface guestType extends Document {
}

const guestSchema: Schema = new Schema({
});

export const guestModel: Model<guestType> = mongoose.model<guestType>('guests', guestSchema);
