import { Router } from 'express';
import imagesControllers from "../../controllers/ImagesController";
import {upload} from "../../middlewares/multer";


const imagesRouter = Router();

imagesRouter.post('/uploadMangaImage', upload.single('image'), imagesControllers.uploadMangaImage)
imagesRouter.post('/uploadMultipleMangaImages', upload.array('images'), imagesControllers.uploadMultipleMangaImages)

export default imagesRouter;
