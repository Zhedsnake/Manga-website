import mongoose, { Schema, Document, Model } from 'mongoose';



interface ImagesType extends Document {
    title: string;
    secure_url: string[];
}

const ImagesSchema: Schema = new Schema({
    title: {
        type: String,
        required: true },
    secure_url: {
        type: [String],
        required: true },
});

const ImagesModel: Model<ImagesType> = mongoose.model('Deck', ImagesSchema);



class ImagesService {
    private model: Model<ImagesType>;

    constructor() {
        this.model = ImagesModel;
    }


}

export default new ImagesService();
