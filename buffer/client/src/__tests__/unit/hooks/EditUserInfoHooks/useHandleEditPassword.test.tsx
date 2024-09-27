import {renderHook, act} from "@testing-library/react";
import useHandleEditPassword from "../../../../../../../client/src/hooks/EditUserInfoHooks/useHandleEditPassword";
import {useActions} from "../reduxHooks/useActions.ts";
import {useTypedSelector} from "../reduxHooks/useTypedSelector.ts";
import verifyEditPassword from "../../../../../../../client/src/util/Verification/EditUserInfo/verifyEditPassword";
import {EditUserInfoContext} from "../../../../../../../client/src/contexts/EditUserInfoContext";
import React from "react";

jest.mock("../reduxHooks/useActions.ts");
jest.mock("../reduxHooks/useTypedSelector.ts");
jest.mock("../../../../../../../client/src/util/Verification/EditUserInfo/verifyEditPassword");

describe("useHandleEditPassword", () => {
    let editPassword: jest.Mock;
    let setMessage: jest.Mock;

    beforeEach(() => {
        editPassword = jest.fn();
        setMessage = jest.fn();

        (useActions as jest.Mock).mockReturnValue({editPassword});
        (useTypedSelector as jest.Mock).mockReturnValue({loading: false, error: null});
        (verifyEditPassword as jest.Mock).mockReturnValue(null);
    });

    const wrapper: React.FC<{ children: React.ReactNode }> = ({children}) => (
        <EditUserInfoContext.Provider value={{setMessage, message: ""}}>
            {children}
        </EditUserInfoContext.Provider>
    );

    test("должен вызвать editPassword при успешной валидации", async () => {
        const {result} = renderHook(() =>
                useHandleEditPassword("oldPassword123", "newPassword456", jest.fn(), jest.fn()),
            {wrapper}
        );

        await act(async () => {
            await result.current.handleEditPassword({preventDefault: jest.fn()} as any);
        });

        expect(editPassword).toHaveBeenCalledWith("oldPassword123", "newPassword456");
    });

    test("должен показать ошибку при неуспешной валидации", async () => {
        (verifyEditPassword as jest.Mock).mockReturnValue({passwordError: "Ошибка валидации"});

        const {result} = renderHook(() =>
                useHandleEditPassword("oldPassword123", "newPassword456", jest.fn(), jest.fn()),
            {wrapper}
        );

        await act(async () => {
            await result.current.handleEditPassword({preventDefault: jest.fn()} as any);
        });

        expect(result.current.error).toBe("Ошибка валидации");
        expect(editPassword).not.toHaveBeenCalled();
    });

    test("должен установить ошибку при изменении passwordError в сторе", async () => {
        (useTypedSelector as jest.Mock).mockReturnValue({loading: false, error: "Ошибка"});

        const {result} = renderHook(() =>
                useHandleEditPassword("oldPassword123", "newPassword456", jest.fn(), jest.fn()),
            {wrapper}
        );

        expect(result.current.error).toBe("Ошибка");
    });

    test("должен обновлять состояние загрузки", () => {
        (useTypedSelector as jest.Mock).mockReturnValue({loading: true, error: null});

        const {result} = renderHook(() =>
                useHandleEditPassword("oldPassword123", "newPassword456", jest.fn(), jest.fn()),
            {wrapper}
        );

        expect(result.current.passwordLoading).toBe(true);
    });
});
