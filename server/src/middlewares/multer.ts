import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const FILE_SIZE = 1;

export enum StorageType {
  DISK = 'disk',
}

export class FileService {

  fileUtil = {
    fileValidation(fn: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => void) {
      return fn;
    },
  };

  disk() {
    return multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads');
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
      },
    });
  }

  uploadFiles = (storage: StorageType, validationFn: (request: Request, file: Express.Multer.File, cb: FileFilterCallback) => void) => {
    const upload = multer({
      storage: this[storage](),
      limits: { fileSize: 1024 * 1024 * FILE_SIZE },
      fileFilter: this.fileUtil.fileValidation(validationFn),
    });

    return upload.array('files', 5);
  };
}




// import multer, { StorageEngine } from 'multer';
// import { Request, Response, NextFunction } from 'express';
//
// const storage: StorageEngine = multer.diskStorage({
//   filename: (
//       req: Request,
//       file: Express.Multer.File,
//       cb: (error: Error | null, filename: string) => void
//   ): void => {
//     cb(null, file.originalname);
//   }
// });
//
// const multerUpload = multer({ storage: storage });
//
// export const upload = (req: Request, res: Response, next: NextFunction) => {
//   multerUpload.any()(req, res, (err) => {
//     if (err) {
//       return res.status(400).send({error: 'Вы не выбрали файлы'});
//     }
//
//     if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
//       return res.status(400).send({error: 'Файлы не загружены'});
//     }
//
//     next();
//   });
// };