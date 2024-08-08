import { Request, Response } from "express";
import CloudinaryService from "../services/cloudinary/cloudinaryService";
import ImagesService from "../services/busines/ImagesService";


class ImagesController {
    async uploadMangaImage (req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).send('Файл не загружен');
            }

            const post = await ImagesService
                .uploadMangaImage(req.body, { file: req.file })
            res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async uploadMultipleMangaImages (req: Request, res: Response) {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).send('Файлы не загружены');
            }

            const post = await ImagesService
                .uploadMultipleMangaImages(req.body, { files: req.files as Express.Multer.File[] });
            res.json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new ImagesController();