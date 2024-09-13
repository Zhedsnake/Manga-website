import { Router } from 'express';
import imagesControllers from "../../controllers/ImagesController";
import { upload } from "../../middlewares/FileService";

const imagesRouter = Router();

imagesRouter.post('/images/uploadImage', upload, imagesControllers.uploadImage);
imagesRouter.post('/images/uploadMultipleImages', upload, imagesControllers.uploadMultipleImages);
imagesRouter.get('/images/getTotalCountImages', imagesControllers.getTotalCountImages);
imagesRouter.get('/images/getImageByNumber', imagesControllers.getImageUrlByNumber);
imagesRouter.get('/images/getAllImages', imagesControllers.getAllImages);

export default imagesRouter;
