import { renderHook, act } from "@testing-library/react";
import useImgInputs from "../../../hooks/useImgInputs";
import { ChangeEvent } from "react";

describe("useImgInputs hook", () => {
    const mockFile = new File(["dummy content"], "example.png", { type: "image/png" });

    beforeAll(() => {
        global.URL.createObjectURL = jest.fn(() => "mockedPreviewURL");
    });

    test("должен установить файл и URL предварительного просмотра при изменении input", () => {
        const { result } = renderHook(() => useImgInputs(null));

        const event = {
            target: {
                files: [mockFile],
            },
        } as unknown as ChangeEvent<HTMLInputElement>;

        act(() => {
            result.current.onChange(event);
        });

        expect(result.current.value).toBe(mockFile);
        expect(result.current.valuePreview).toBe(URL.createObjectURL(mockFile));
    });

    test("должен сбросить значение файла и предварительный просмотр при вызове clear", () => {
        const { result } = renderHook(() => useImgInputs(mockFile));

        act(() => {
            result.current.clear();
        });

        expect(result.current.value).toBe(mockFile);
        expect(result.current.valuePreview).toBe("");
    });
});
