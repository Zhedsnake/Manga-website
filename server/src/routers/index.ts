import { Router } from 'express';
import imagesRouter from "./imagesRouters";

const routers = Router();

routers.use('/api', imagesRouter);

export default routers;
