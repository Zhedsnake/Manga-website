import { Router } from 'express';
import imagesControllers from "../../controllers/ImagesController";
import { upload } from "../../middlewares/multer";

const imagesRouter = Router();

imagesRouter.post('/uploadImage', upload, imagesControllers.uploadImage);
imagesRouter.post('/uploadMultipleImages', upload, imagesControllers.uploadMultipleImages);
imagesRouter.get('/getTotalCountImages', imagesControllers.getTotalCountImages);
imagesRouter.get('/getImageByNumber', imagesControllers.getImageUrlByNumber);
imagesRouter.get('/getAllImages', imagesControllers.getAllImages);

export default imagesRouter;
