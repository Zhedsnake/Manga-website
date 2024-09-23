import { renderHook, act } from "@testing-library/react";
import useHandleEditName from "../../../../hooks/EditUserInfoHooks/useHandleEditName";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import verifyEditName from "../../../../util/Verification/EditUserInfo/verifyEditName";
import { EditUserInfoContext } from "../../../../contexts/EditUserInfoContext";
import React from "react";

jest.mock("../../../../hooks/useActions");
jest.mock("../../../../hooks/useTypedSelector");
jest.mock("../../../../util/Verification/EditUserInfo/verifyEditName");

describe("useHandleEditName", () => {
    let editName: jest.Mock;
    let setMessage: jest.Mock;

    beforeEach(() => {
        editName = jest.fn();
        setMessage = jest.fn();

        (useActions as jest.Mock).mockReturnValue({ editName });
        (useTypedSelector as jest.Mock).mockReturnValue({ loading: false, error: null });
        (verifyEditName as jest.Mock).mockReturnValue(null);
    });

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <EditUserInfoContext.Provider value={{ setMessage, message: "" }}>
            {children}
        </EditUserInfoContext.Provider>
    );

    test("должен вызвать editName при успешной валидации", async () => {
        const clearMock = jest.fn();

        const { result } = renderHook(() => useHandleEditName("newName", clearMock), { wrapper });

        await act(async () => {
            await result.current.handleEditName({ preventDefault: jest.fn() } as any);
        });

        expect(editName).toHaveBeenCalledWith("newName");
        expect(clearMock).toHaveBeenCalled();
    });

    test("должен показать ошибку при неуспешной валидации", async () => {
        (verifyEditName as jest.Mock).mockReturnValue({ nameError: "Ошибка валидации" });

        const clearMock = jest.fn();

        const { result } = renderHook(() => useHandleEditName("invalidName", clearMock), { wrapper });

        await act(async () => {
            await result.current.handleEditName({ preventDefault: jest.fn() } as any);
        });

        expect(result.current.error).toBe("Ошибка валидации");
        expect(editName).not.toHaveBeenCalled();
    });

    test("должен установить ошибку при изменении nameError в сторе", async () => {
        (useTypedSelector as jest.Mock).mockReturnValue({ loading: false, error: "Ошибка" });

        const { result } = renderHook(() => useHandleEditName("newName", jest.fn()), { wrapper });

        expect(result.current.error).toBe("Ошибка");
    });

    test("должен обновлять состояние загрузки", () => {
        (useTypedSelector as jest.Mock).mockReturnValue({ loading: true, error: null });

        const { result } = renderHook(() => useHandleEditName("newName", jest.fn()), { wrapper });

        expect(result.current.nameLoading).toBe(true);
    });
});
