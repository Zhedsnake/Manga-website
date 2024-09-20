import verifyAvatar from '../../../util/Verification/verifyAvatar';

class MockFile {
    name: string;
    type: string;
    size: number;

    constructor(name: string, type: string, size: number) {
        this.name = name;
        this.type = type;
        this.size = size;
    }
}

describe('verifyAvatar', () => {

    beforeEach(() => {
        jest.resetAllMocks();

        // global.URL.createObjectURL = jest.fn(() => 'mock-url');
        //
        // Object.defineProperty(global, 'Image', {
        //     writable: true,
        //     configurable: true,
        //     value: class {
        //         width: number = 0;
        //         height: number = 0;
        //         onload: ((event: Event) => void) | null = null;
        //         constructor() {}
        //     }
        // });
    });


    test('должен вернуть ошибку, если аватар не загружен', () => {
        const result = verifyAvatar(null);
        expect(result).toEqual({ avatarError: "Вы не загрузили аватарку" });
    });

    test('должен вернуть ошибку, если размер файла превышает 3.68 MB', () => {
        const largeFile = new MockFile('avatar.png', 'image/png', 4000000);

        const result = verifyAvatar(largeFile as unknown as File);

        expect(result).toEqual({ avatarError: "Размер файла не должен превышать 3.68 MB." });
    });

    test('должен вернуть ошибку, если формат файла не jpeg, jpg или png', () => {
        const wrongFormatFile = new MockFile('avatar.gif', 'image/gif', 1000);

        const result = verifyAvatar(wrongFormatFile as unknown as File);
        expect(result).toEqual({ avatarError: "Допустимые форматы jpeg, jpg или png" });
    });

    // test('должен вернуть ошибку, если изображение не 1:1', async () => {
    //     const validFile = new MockFile('avatar.jpg', 'image/jpeg', 1000);
    //
    //     const image = new global.Image();
    //     jest.spyOn(image, 'onload').mockImplementation(function (this: HTMLImageElement) {
    //         this.width = 100;
    //         this.height = 50;
    //         this.onload?.(new Event('load')); // вызываем onload с событием
    //     });
    //
    //     // Здесь предполагаем, что verifyAvatar вызывает загрузку изображения
    //     const result = await verifyAvatar(validFile as unknown as File);
    //
    //     expect(image.onload).toHaveBeenCalled(); // проверяем, был ли вызван onload
    //     expect(result).toEqual({ avatarError: "Изображение должно иметь соотношение сторон 1:1." });
    // });

    // test('должен вернуть null, если файл корректен', () => {
    //     const validFile = new MockFile('avatar.jpg', 'image/jpeg', 1000);
    //
    //     const result = verifyAvatar(validFile as unknown as File);
    //     expect(result).toBeNull();
    // });
});
