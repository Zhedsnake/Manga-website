import * as fs from 'fs';
import * as path from 'path';
import verifyAvatar from '../../../util/Verification/verifyAvatar';


describe('verifyAvatar', () => {

    beforeEach(() => {
        jest.resetAllMocks();

        global.URL.createObjectURL = jest.fn(() => 'mock-url');
        Object.defineProperty(global, 'Image', {
            writable: true,
            configurable: true,
            value: class {
                width = 0;
                height = 0;
                onload = null;
                constructor() {}
            }
        });
    });


    test('должен вернуть ошибку, если аватар не загружен', () => {
        const result = verifyAvatar(null);
        expect(result).toEqual({ avatarError: "Вы не загрузили аватарку" });
    });

    test('должен вернуть ошибку, если размер файла превышает 3.68 MB', () => {
        const largeFilePath = path.join(__dirname, 'images', '../../../images/noSymImg.png');

        const largeFile = fs.readFileSync(largeFilePath);

        const largeMockFile = new File([largeFile], 'noSymImg.png', { type: 'image/png' });

        const result = verifyAvatar(largeMockFile);
        expect(result).toEqual({ avatarError: "Размер файла не должен превышать 3.68 MB." });
    });

    test('должен вернуть ошибку, если формат файла не jpeg, jpg или png', () => {
        const wrongFormatFilePath = path.join(__dirname, 'images', '../../../images/among-us-sus.mp4');

        const wrongFormatFile = fs.readFileSync(wrongFormatFilePath);

        const mockFile = new File([wrongFormatFile], 'among-us-sus.mp4', { type: 'video/mp4' });

        const result = verifyAvatar(mockFile);

        expect(result).toEqual({ avatarError: "Допустимые форматы jpeg, jpg или png" });
    });

    // test('должен вернуть ошибку, если изображение не 1:1', async () => {
    //     const NoSymFilePath = path.join(__dirname, 'images', '../../../images/454cf2e7c7f66b07b2310d467f75631d--butterflies.jpg');
    //
    //     const NoSymFileFile = fs.readFileSync(NoSymFilePath);
    //
    //     const mockFile = new File([NoSymFileFile], '454cf2e7c7f66b07b2310d467f75631d--butterflies.jpg', { type: 'image/jpg' });
    //
    //     const result = verifyAvatar(mockFile);
    //
    //     expect(result).toEqual({ avatarError: "Изображение должно иметь соотношение сторон 1:1." });
    // });

    test('должен вернуть null, если файл корректен', () => {
        const SymFilePath = path.join(__dirname, 'images', '../../../images/1x1.png');

        const SymFileFile = fs.readFileSync(SymFilePath);

        const mockFile = new File([SymFileFile], '1x1.png', { type: 'image/png' });

        const result = verifyAvatar(mockFile);

        expect(result).toBeNull();
    });
});
