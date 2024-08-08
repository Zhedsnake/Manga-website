import { Request, Response } from "express";
import CloudinaryService from "../services/cloudinary/cloudinaryService";
import ImagesService from "../services/busines/ImagesService";


class ImagesController {
    async uploadMangaImage (req: Request, res: Response) {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send({message: 'Файл не загружен'});
        }

        if (Array.isArray(req.files) && req.files.length > 1) {
            return res.status(400).send({message: 'Вы загрузили больше одного файла'});
        }

        const post = await ImagesService
            .uploadMultipleImages(req.body, { files: req.files as Express.Multer.File[] });
        res.json(post);
    }

    async uploadMultipleMangaImages (req: Request, res: Response) {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send({message: 'Файлы не загружены'});
        }

        const post = await ImagesService
            .uploadMultipleImages(req.body, { files: req.files as Express.Multer.File[] });
        res.json(post);
    }
}

export default new ImagesController();