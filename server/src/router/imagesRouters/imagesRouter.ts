import { Router } from 'express';
import imagesControllers from "../../controllers/ImagesController";
import FileService from "../../middlewares/FileService";

const imagesRouter = Router();

imagesRouter.post('/images/uploadImage', FileService.uploadUserAvatar, imagesControllers.uploadImage);
imagesRouter.post('/images/uploadMultipleImages', FileService.uploadUserAvatar, imagesControllers.uploadMultipleImages);
imagesRouter.get('/images/getTotalCountImages', imagesControllers.getTotalCountImages);
imagesRouter.get('/images/getImageByNumber', imagesControllers.getImageUrlByNumber);
imagesRouter.get('/images/getAllImages', imagesControllers.getAllImages);

export default imagesRouter;
