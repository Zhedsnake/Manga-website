import sharp from 'sharp';
import { UploadedImageByMulter } from '../../../../src/types/uploadedImageByMulter';
import SharpService from '../../../../src/services/Sharp/SharpService';
import mockFs from 'mock-fs';

// Мокаем sharp и его методы вручную
const mockSharpInstance = {
    webp: jest.fn().mockReturnThis(),
    resize: jest.fn().mockReturnThis(),
    toBuffer: jest.fn().mockResolvedValue(Buffer.from('mockedBuffer')),
    toFile: jest.fn().mockResolvedValue({})
};

jest.mock('sharp', () => jest.fn(() => mockSharpInstance));

describe('SharpService', () => {
    beforeEach(() => {
        mockFs({
            '/tmp': {} // создаем фиктивную файловую систему
        });
    });

    afterEach(() => {
        mockFs.restore(); // восстанавливаем файловую систему после тестов
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

        // Проверяем, что методы sharp были вызваны корректное количество раз
        expect(sharp).toHaveBeenCalledTimes(3); // вызовы sharp()
        expect(mockSharpInstance.webp).toHaveBeenCalledTimes(2); // вызовы .webp()
        expect(mockSharpInstance.resize).toHaveBeenCalledTimes(1); // вызовы .resize()
        expect(mockSharpInstance.toBuffer).toHaveBeenCalledTimes(2); // вызовы .toBuffer()
        expect(mockSharpInstance.toFile).toHaveBeenCalledTimes(3); // вызовы .toFile()
    });
});
