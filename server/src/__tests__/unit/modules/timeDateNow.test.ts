import { timeDateNow } from '../../../modules/timeDateNow';
import MockDate from 'mockdate';

describe('timeDateNow', () => {

    beforeAll(() => {
        MockDate.set(new Date(2024, 8, 5, 13, 15))
    })

    afterAll(() => {
        MockDate.reset()
    })

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('Date должен быть вызван только один раз', () => {
        const spyDate = jest.spyOn(global, 'Date');
        timeDateNow();
        expect(spyDate).toHaveBeenCalledTimes(1);
    });

    test('Date методы должны быть вызваны один раз', () => {
        const spyGetHours = jest.spyOn(Date.prototype, 'getHours');
        const spyGetMinutes = jest.spyOn(Date.prototype, 'getMinutes');
        const spyGetDate = jest.spyOn(Date.prototype, 'getDate');
        const spyGetMonth = jest.spyOn(Date.prototype, 'getMonth');
        const spyGetFullYear = jest.spyOn(Date.prototype, 'getFullYear');

        timeDateNow();

        expect(spyGetHours).toHaveBeenCalledTimes(1);
        expect(spyGetMinutes).toHaveBeenCalledTimes(1);
        expect(spyGetDate).toHaveBeenCalledTimes(1);
        expect(spyGetMonth).toHaveBeenCalledTimes(1);
        expect(spyGetFullYear).toHaveBeenCalledTimes(1);
    });

    test('должна быть возвращена правильно отформатированная строка времени и даты', () => {
        expect(timeDateNow()).toBe(' ч:м 16:15, день 5, месяц Сентябрь, год 2024');
        expect(timeDateNow()).toMatchSnapshot();
    });

});
