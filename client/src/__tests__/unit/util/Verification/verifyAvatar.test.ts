import * as fs from 'fs';
import * as path from 'path';

if (typeof global.TextEncoder === 'undefined') {
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
}

import { JSDOM } from 'jsdom';
import verifyAvatar from '../../../../util/Verification/verifyAvatar';


describe('verifyAvatar', () => {
    let dom: JSDOM;

    beforeAll(() => {
        dom = new JSDOM();
        global.URL = dom.window.URL;
        global.URL.createObjectURL = jest.fn(() => 'mock-url');
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('должен вернуть ошибку, если аватар не загружен', async () => {
        const result = await verifyAvatar(null);
        expect(result).toEqual({ avatarError: "Вы не загрузили аватарку" });
    });

    test('должен вернуть ошибку, если размер файла превышает 3.68 MB', async () => {
        const largeFilePath = path.join(__dirname, 'images', '../../../../images/noSymImg.png');
        const largeFile = fs.readFileSync(largeFilePath);

        const largeMockFile = new File([largeFile], 'noSymImg.png', { type: 'image/png' });
        const result = await verifyAvatar(largeMockFile);
        expect(result).toEqual({ avatarError: "Размер файла не должен превышать 3.68 MB." });
    });

    test('должен вернуть ошибку, если формат файла не jpeg, jpg или png', async () => {
        const wrongFormatFilePath = path.join(__dirname, 'images', '../../../../images/among-us-sus.mp4');
        const wrongFormatFile = fs.readFileSync(wrongFormatFilePath);

        const mockFile = new File([wrongFormatFile], 'among-us-sus.mp4', { type: 'video/mp4' });
        const result = await verifyAvatar(mockFile);
        expect(result).toEqual({ avatarError: "Допустимые форматы jpeg, jpg или png" });
    });

    test('должен вернуть ошибку, если изображение не 1:1', async () => {
        const mockFile = new File([Buffer.alloc(1)], 'test.jpg', { type: 'image/jpeg' });

        global.Image = class {
            width = 100;
            height = 50;
            onload: (() => void) | null = null;

            constructor() {
                setTimeout(() => {
                    if (this.onload) this.onload();
                }, 0);
            }
        } as unknown as new () => HTMLImageElement;

        const result = await verifyAvatar(mockFile);
        expect(result).toEqual({ avatarError: "Изображение должно иметь соотношение сторон 1:1." });
    });

    test('должен вернуть null, если файл корректен', async () => {
        const mockFile = new File([Buffer.alloc(1)], 'test.jpg', { type: 'image/jpeg' });

        global.Image = class {
            width = 100;
            height = 100;
            onload: (() => void) | null = null;

            constructor() {
                setTimeout(() => {
                    if (this.onload) this.onload();
                }, 0);
            }
        } as unknown as new () => HTMLImageElement;

        const result = await verifyAvatar(mockFile);
        expect(result).toBeNull();
    });
});
