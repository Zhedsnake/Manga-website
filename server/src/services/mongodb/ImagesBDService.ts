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

    async getTotalCountImages() {
        const count = await this.model.countDocuments();
        return count;
    }

    async getImageUrlByNumber(number: number) {
        const imageUrlByNumber = await this.model.findOne().skip(number - 1);
        return imageUrlByNumber;
    }

    async getAllImages(): Promise<ImagesType[]> {
        const images = await this.model.find();
        return images;
    }
}

export default new ImagesBDService();
