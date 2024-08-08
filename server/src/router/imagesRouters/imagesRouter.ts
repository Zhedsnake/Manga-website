import { Router } from 'express';
import imagesControllers from "../../controllers/ImagesController";
import { upload } from "../../middlewares/multer";

const imagesRouter = Router();

imagesRouter.post('/uploadImage', upload, imagesControllers.uploadMangaImage);
imagesRouter.post('/uploadMultipleImages', upload, imagesControllers.uploadMultipleMangaImages);

export default imagesRouter;
