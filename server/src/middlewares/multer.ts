import multer, {FileFilterCallback} from 'multer';
import {Request, Response, NextFunction} from 'express';
import sharp, {Metadata} from 'sharp';
import fs from 'fs';

const FILE_SIZE = 3.68; // 3.68MB

class FileService {

    disk() {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '/tmp');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname + '-' + Date.now());
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
            limits: {fileSize: 1024 * 1024 * FILE_SIZE},
        });

        return (req: Request, res: Response, next: NextFunction) => {
            try {
                upload.single('avatar')(req, res, async (err: any) => {

                    if (err) {

                        if (req.file) {
                            await this.deleteFile(req.file.path);
                        }

                        return res.status(400).json({error: err.message});
                    }

                    if (req.file) {

                        next();

                    }
                });
            } catch (error) {
                return res.status(400).json({error: error})
            }
        };
    }
}

export default FileService;
