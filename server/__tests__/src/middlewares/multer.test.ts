import { FileService, StorageType } from '../../../src/middlewares/multer';
import multer from 'multer';

const mMulter = {
    array: jest.fn(),
};

jest.mock('multer', () => {
    const multer = jest.fn(() => mMulter);
    const oMulter = jest.requireActual('multer');
    for (const prop in oMulter) {
        if (Object.prototype.hasOwnProperty.call(oMulter, prop)) {
            (multer as any)[prop] = oMulter[prop];
        }
    }
    return multer;
});

describe('FileService multer test', () => {
    let validationFn: jest.Mock<any, any>;

    afterAll(() => {
        jest.resetAllMocks();
    });

    beforeEach(() => {
        validationFn = jest.fn();
    });

    afterEach(() => {
        validationFn.mockClear();
    });

    test('should pass', () => {
        const fileService = new FileService();
        fileService.uploadFiles(StorageType.DISK, validationFn);

        expect(multer).toHaveBeenCalled();
        expect(mMulter.array).toHaveBeenCalledWith('files', 5);
    });
});
