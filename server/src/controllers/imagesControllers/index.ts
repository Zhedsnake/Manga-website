import { Request, Response } from "express";
import CloudinaryService from "../../cloudinary/cloudinaryService";


class ImagesController {
    async uploadMangaImage (req: Request, res: Response) {

        if (!req.file || Object.keys(req.file).length === 0) {
            return res.status(400).send('Файл не загружен');
        }

        try {
            const post = await CloudinaryService.uploadMangaImage(req.file.path, req.file.originalname, 'example')
            res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new ImagesController();