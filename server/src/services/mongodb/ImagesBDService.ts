import { Model } from "mongoose";
import {ImagesModel, ImagesType} from "../../models/imagesModel";


class ImagesBDService {
    private model: Model<ImagesType>;

    constructor() {
        this.model = ImagesModel;
    }

    async uploadImages(original_filename: string, secure_url: string): Promise<ImagesType> {
        const newDeck = new this.model({ original_filename, secure_url });
        return await newDeck.save();
    }

}

export default new ImagesBDService();
