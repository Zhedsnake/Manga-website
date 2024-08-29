import { Request, Response } from "express";
import CloudinaryService from "../services/cloudinary/CloudinaryService";
import ImagesService from "../services/busines/ImagesService";
import {ImagesType} from "../models/imagesModel";


class ImagesController {
    async uploadImage (req: Request, res: Response): Promise<Response<{ message: string }>> {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send({message: 'Файл не загружен'});
        }

        if (Array.isArray(req.files) && req.files.length > 1) {
            return res.status(400).send({message: 'Вы загрузили больше одного файла'});
        }

        const post = await ImagesService.uploadImages(req.body, { files: req.files as Express.Multer.File[] });
        return res.json(post);
    }

    async uploadMultipleImages (req: Request, res: Response): Promise<Response<{ message: string }>> {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send({message: 'Файлы не загружены'});
        }

        const post = await ImagesService
            .uploadImages(req.body, { files: req.files as Express.Multer.File[] });
        return res.json(post);
    }

    async getTotalCountImages (req: Request, res: Response): Promise<Response<{ countImages: number }>> {
        const count = await ImagesService.getTotalCountImages();

        return res.json(count)
    }

    async getImageUrlByNumber (req: Request, res: Response) {
        if (!req.query.number) {
            return res.status(400).send({message: 'query параметр не указан'});
        }

        const imageUrlByNumber:
            { message: string }
            | { secure_url: string }
            | undefined = await ImagesService.getImageUrlByNumber(req.query.number);

        if (typeof imageUrlByNumber === 'undefined') {
            console.error(`Из сервиса для ссылки изображения не пришло ничего`)

        } else if ('secure_url' in imageUrlByNumber) {

            return res.json({secure_url: imageUrlByNumber.secure_url});

        } else {

            return res.status(400).json({message: imageUrlByNumber.message});

        }
    }

    async getAllImages(req: Request, res: Response) {
        const images:
            { message: string }
            | { secure_url: string }[]
            | undefined = await ImagesService.getAllImages();

        if (typeof images === 'undefined') {
            console.error(`Из сервиса для ссылкок изображений не пришло ничего`)

        } else if (Array.isArray(images)) {

            return res.json(images);

        } else if ('message' in images) {

            return res.status(400).json({ message: images.message });

        }
    }
}

export default new ImagesController();