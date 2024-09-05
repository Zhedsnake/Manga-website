import multer, { StorageEngine } from 'multer';
import { Request, Response, NextFunction } from 'express';

const storage: StorageEngine = multer.diskStorage({
  filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
  ): void => {
    cb(null, file.originalname);
  }
});

const multerUpload = multer({ storage: storage });

export const upload = (req: Request, res: Response, next: NextFunction) => {
  multerUpload.any()(req, res, (err) => {
    if (err) {
      return res.status(400).send({error: 'Вы не выбрали файлы'});
    }

    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      return res.status(400).send({error: 'Файлы не загружены'});
    }

    next();
  });
};
