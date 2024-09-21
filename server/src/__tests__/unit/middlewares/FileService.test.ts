import FileService from '../../../middlewares/FileService';
import {Request, Response, NextFunction} from 'express';
import multer from 'multer';
import fs from 'fs';

jest.mock('multer');
jest.mock('fs', () => ({
    promises: {
        unlink: jest.fn(),
    },
}));

describe('FileService uploadUserAvatar', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {

        req = {
            file: {
                path: '/tmp/test.png',
                size: 1024,
            } as any,
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('следует вызвать next, когда файл будет успешно загружен', async () => {
        const uploadSingleMock = jest.fn((req, res, cb) => cb(null));
        (multer as unknown as jest.MockInstance<any, any>).mockReturnValue({single: jest.fn(() => uploadSingleMock)});

        const middleware = FileService.uploadUserAvatar();
        await middleware(req as Request, res as Response, next);

        expect(uploadSingleMock).toHaveBeenCalledWith(req, res, expect.any(Function));
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    test('должен возвращать значение 400, если размер файла превышает установленный лимит', async () => {
        if (req.file) req.file.size = 5 * 1024 * 1024; // 5MB file
        const uploadSingleMock = jest.fn((req, res, cb) => {
            const error = new Error('File too large');
            (error as any).code = 'LIMIT_FILE_SIZE';
            cb(error);
        });
        (multer as unknown as jest.MockInstance<any, any>).mockReturnValue({single: jest.fn(() => uploadSingleMock)});

        const middleware = FileService.uploadUserAvatar();
        await middleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: 'Размер файла не должен превышать 3.68 MB.'});
        expect(next).not.toHaveBeenCalled();
    });

    test('следует удалить файл при любой другой ошибке', async () => {
        const uploadSingleMock = jest.fn((req, res, cb) => {
            const error = new Error('Some error');
            cb(error);
        });
        (multer as unknown as jest.MockInstance<any, any>).mockReturnValue({single: jest.fn(() => uploadSingleMock)});

        const middleware = FileService.uploadUserAvatar();

        await middleware(req as Request, res as Response, next);

        expect(fs.promises.unlink).toHaveBeenCalledWith(req.file?.path);
    });

});
