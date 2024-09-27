import {renderHook, act} from "@testing-library/react";
import useHandleEditEmail from "../../../../../../../client/src/hooks/EditUserInfoHooks/useHandleEditEmail";
import {useActions} from "../reduxHooks/useActions.ts";
import {useTypedSelector} from "../reduxHooks/useTypedSelector.ts";
import verifyEmail from "../../../../../../../client/src/util/Verification/verifyEmail";
import {EditUserInfoContext} from "../../../../../../../client/src/contexts/EditUserInfoContext";
import React from "react";

jest.mock("../reduxHooks/useActions.ts");
jest.mock("../reduxHooks/useTypedSelector.ts");
jest.mock("../../../../../../../client/src/util/Verification/verifyEmail");

describe("useHandleEditEmail", () => {
    let editEmail: jest.Mock;
    let setMessage: jest.Mock;

    beforeEach(() => {
        editEmail = jest.fn();
        setMessage = jest.fn();

        (useActions as jest.Mock).mockReturnValue({editEmail});
        (useTypedSelector as jest.Mock).mockReturnValue({loading: false, error: null});
        (verifyEmail as jest.Mock).mockReturnValue(null);
    });

    const wrapper: React.FC<{ children: React.ReactNode }> = ({children}) => (
        <EditUserInfoContext.Provider value={{setMessage, message: ""}}>
            {children}
        </EditUserInfoContext.Provider>
    );

    test("должен вызвать editEmail при успешной валидации", async () => {
        const clearMock = jest.fn();

        const {result} = renderHook(() => useHandleEditEmail("test@example.com", clearMock), {wrapper});

        await act(async () => {
            await result.current.handleEditEmail({preventDefault: jest.fn()} as any);
        });

        expect(editEmail).toHaveBeenCalledWith("test@example.com");
        expect(clearMock).toHaveBeenCalled();
    });

    test("должен показать ошибку при неуспешной валидации", async () => {
        (verifyEmail as jest.Mock).mockReturnValue({emailError: "Ошибка валидации"});

        const clearMock = jest.fn();

        const {result} = renderHook(() => useHandleEditEmail("invalidEmail", clearMock), {wrapper});

        await act(async () => {
            await result.current.handleEditEmail({preventDefault: jest.fn()} as any);
        });

        expect(result.current.error).toBe("Ошибка валидации");
        expect(editEmail).not.toHaveBeenCalled();
    });

    test("должен установить ошибку при изменении emailError в сторе", async () => {
        (useTypedSelector as jest.Mock).mockReturnValue({loading: false, error: "Ошибка"});

        const {result} = renderHook(() => useHandleEditEmail("test@example.com", jest.fn()), {wrapper});

        expect(result.current.error).toBe("Ошибка");
    });

    test("должен обновлять состояние загрузки", () => {
        (useTypedSelector as jest.Mock).mockReturnValue({loading: true, error: null});

        const {result} = renderHook(() => useHandleEditEmail("test@example.com", jest.fn()), {wrapper});

        expect(result.current.emailLoading).toBe(true);
    });
});
