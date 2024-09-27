import { renderHook, act } from "@testing-library/react";
import useHandleEditAvatar from "../../../../../../../client/src/hooks/EditUserInfoHooks/useHandleEditAvatar";
import { useActions } from "../reduxHooks/useActions";
import { useTypedSelector } from "../reduxHooks/useTypedSelector";
import verifyEditAvatar from "../../../../../../../client/src/util/Verification/EditUserInfo/verifyEditAvatar";
import { EditUserInfoContext } from "../../../../../../../client/src/contexts/EditUserInfoContext";
import React from "react";

jest.mock("../reduxHooks/useActions");
jest.mock("../reduxHooks/useTypedSelector");
jest.mock("../../../../../../../client/src/util/Verification/EditUserInfo/verifyEditAvatar");

describe("useHandleEditAvatar", () => {
    let editAvatar: jest.Mock;
    let setMessage: jest.Mock;

    beforeEach(() => {
        editAvatar = jest.fn();
        setMessage = jest.fn();

        (useActions as jest.Mock).mockReturnValue({ editAvatar });
        (useTypedSelector as jest.Mock).mockReturnValue({ loading: false, error: null });
        (verifyEditAvatar as jest.Mock).mockReturnValue(null);
    });

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <EditUserInfoContext.Provider value={{ setMessage, message: "" }}>
            {children}
        </EditUserInfoContext.Provider>
    );

    test("должен вызвать editAvatar при успешной валидации", async () => {
        const clearMock = jest.fn();
        const avatarFile = new File(["dummy content"], "avatar.png", { type: "image/png" });

        const { result } = renderHook(() => useHandleEditAvatar(avatarFile, clearMock), { wrapper });

        await act(async () => {
            if (result.current) {
                await result.current.handleEditAvatar({ preventDefault: jest.fn() } as any);
            }
        });

        expect(editAvatar).toHaveBeenCalled();
        expect(clearMock).toHaveBeenCalled();
    });

    test("должен показать ошибку при неуспешной валидации", async () => {
        (verifyEditAvatar as jest.Mock).mockReturnValue({ avatarError: "Ошибка валидации" });

        const clearMock = jest.fn();
        const avatarFile = new File(["dummy content"], "invalid_avatar.png", { type: "image/png" });

        const { result } = renderHook(() => useHandleEditAvatar(avatarFile, clearMock), { wrapper });

        await act(async () => {
            if (result.current) {
                await result.current.handleEditAvatar({ preventDefault: jest.fn() } as any);
            }
        });

        if (result.current) {
            expect(result.current.error).toBe("Ошибка валидации");
        }
        expect(editAvatar).not.toHaveBeenCalled();
    });


    test("должен установить ошибку при изменении avatarError в сторе", async () => {
        (useTypedSelector as jest.Mock).mockReturnValue({ loading: false, error: "Ошибка загрузки" });

        const { result } = renderHook(() => useHandleEditAvatar(null, jest.fn()), { wrapper });

        expect(result.current.error).toBe("Ошибка загрузки");
    });

    test("должен обновлять состояние загрузки", () => {
        (useTypedSelector as jest.Mock).mockReturnValue({ loading: true, error: null });

        const { result } = renderHook(() => useHandleEditAvatar(null, jest.fn()), { wrapper });

        expect(result.current.avatarLoading).toBe(true);
    });
});
