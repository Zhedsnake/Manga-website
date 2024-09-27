import { render, fireEvent } from '@testing-library/react';
import useInput from '../../../../../../client/src/hooks/useInput';

if (typeof global.TextEncoder === 'undefined') {
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
}

const TestComponent = ({ initialValue }: { initialValue: string }) => {
    const { value, onChange, setValue, clear } = useInput(initialValue);

    return (
        <div>
            <input data-testid="input" value={value} onChange={onChange} />
            <button data-testid="clear" onClick={clear}>Clear</button>
            <button data-testid="set-value" onClick={() => setValue('New value')}>Set New Value</button>
        </div>
    );
};

describe('useInput hook', () => {

    test('должен изменять значение при вводе', () => {
        const { getByTestId } = render(<TestComponent initialValue="Initial" />);
        const input = getByTestId('input') as HTMLInputElement;

        expect(input.value).toBe('Initial');

        fireEvent.change(input, { target: { value: 'Updated value' } });

        expect(input.value).toBe('Updated value');
    });

    test('должен сбрасывать значение к начальному при вызове clear', () => {
        const { getByTestId } = render(<TestComponent initialValue="Initial" />);
        const input = getByTestId('input') as HTMLInputElement;
        const clearButton = getByTestId('clear');

        fireEvent.change(input, { target: { value: 'Updated value' } });
        expect(input.value).toBe('Updated value');

        fireEvent.click(clearButton);

        expect(input.value).toBe('Initial');
    });

    test('должен обновлять значение при вызове setValue', () => {
        const { getByTestId } = render(<TestComponent initialValue="Initial" />);
        const input = getByTestId('input') as HTMLInputElement;
        const setValueButton = getByTestId('set-value');

        fireEvent.click(setValueButton);

        expect(input.value).toBe('New value');
    });
});
