import { Router } from 'express';
import imagesControllers from "../../controllers/imagesControllers";
import {upload} from "../../middlewares/multer";


const imagesRouter = Router();

imagesRouter.post('/uploadMangaImage', upload.single('image'), imagesControllers.uploadMangaImage)

export default imagesRouter;
