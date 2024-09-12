import multer from 'multer';
import {Request, Response, NextFunction} from 'express';
import fs from 'fs';

const FILE_SIZE_LIMIT = 3.68 * 1024 * 1024; // 3.68 MB in bytes

class FileService {

    disk() {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '/tmp');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            },
        });
    }

    async deleteFile(filePath: string) {
        await fs.promises.unlink(filePath);
    }

    // uploadFiles() {
    //     const upload = multer({
    //         storage: this.disk(),
    //         limits: {fileSize: 1024 * 1024 * FILE_SIZE},
    //         fileFilter: this.fileFilterConfig,
    //     });
    //
    //     return (req: Request, res: Response, next: NextFunction) => {
    //         upload.array('files', 5)(req, res, next);
    //     };
    // }

    uploadUserAvatar() {
        const upload = multer({
            storage: this.disk(),
            limits: {fileSize: FILE_SIZE_LIMIT },
        });

        return (req: Request, res: Response, next: NextFunction) => {
            upload.single('avatar')(req, res, async (err: any) => {

                if (err) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        return res.status(400).json({ error: 'Размер файла не должен превышать 3.68 MB.' });
                    }

                    if (req.file) {
                        await this.deleteFile(req.file.path);
                    }

                    return res.status(400).json({error: err.message});
                }

                if (req.file) {

                    console.log('File size:', req.file.size);
                    next();

                }
            });
        };
    }
}

export default FileService;
