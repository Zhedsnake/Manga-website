import { Router } from 'express';
import imagesRouter from "./imagesRouters/imagesRouter";

const routers = Router();

routers.use('/api', imagesRouter);

export default routers;
