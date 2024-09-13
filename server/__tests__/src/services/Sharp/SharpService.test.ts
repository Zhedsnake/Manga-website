import sharp from 'sharp';
import { UploadedImageByMulter } from '../../../../src/types/uploadedImageByMulter';
import SharpService from '../../../../src/services/Sharp/SharpService';
import mockFs from 'mock-fs';

// Мокаем sharp и его методы вручную
jest.mock('sharp');

describe('SharpService', () => {
    const mockSharpInstance = {
        webp: jest.fn().mockReturnThis(),
        resize: jest.fn().mockReturnThis(),
        toBuffer: jest.fn().mockResolvedValue(Buffer.from('mockedBuffer')),
        toFile: jest.fn().mockResolvedValue({})
    };

    beforeEach(() => {
        jest.clearAllMocks();

        (sharp as unknown as jest.Mock).mockReturnValue(mockSharpInstance);

        mockFs({
            '/tmp': {}
        });
    });

    afterEach(() => {
        mockFs.restore();
    });

    it('должен скомпилировать изображения в три формата и сохранить их', async () => {
        const imageBuffer = 'fakeImageBuffer';
        const avatarFile: UploadedImageByMulter = {
            fieldname: 'avatar',
            originalname: 'test.png',
            encoding: '7bit',
            mimetype: 'image/png',
            buffer: Buffer.from(imageBuffer),
            size: 1024,
            filename: 'test.png',
            path: '/tmp/test.png',
            destination: '/tmp'
        };

        const result = await SharpService.CompileImageInThreeFormats(imageBuffer, avatarFile);

        expect(result).toEqual({
            webpFilePath: '/tmp/test.webp',
            minimizedFilePath: '/tmp/test-480p.png',
            minimizedWebpFilePath: '/tmp/test-480p.webp',
        });

        expect(sharp).toHaveBeenCalledTimes(5);
        expect(mockSharpInstance.webp).toHaveBeenCalledTimes(2);
        expect(mockSharpInstance.resize).toHaveBeenCalledTimes(1);
        expect(mockSharpInstance.toBuffer).toHaveBeenCalledTimes(2);
        expect(mockSharpInstance.toFile).toHaveBeenCalledTimes(3);
    });
});
