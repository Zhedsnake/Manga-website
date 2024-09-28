import {renderHook, act} from "@testing-library/react";
import useHandleReg from "../../../../../../../client/src/hooks/Auth/useHandleReg";
import {useTypedSelector} from "../../../../hooks/reduxHooks/useTypedSelector.ts";
import {useActions} from "../../../../hooks/reduxHooks/useActions.ts";
import {AuthContext} from "../../../../../../../client/src/contexts/AuthContext";
import verifyReg from "../../../../../../../client/src/util/Auth/verifyReg.ts";
import {setToken} from "../../../../../../../client/src/util/setTocken";
import {Tokens} from "../../../../../../../client/src/util/Tokens";

jest.mock("../../../../hooks/reduxHooks/useTypedSelector.ts");
jest.mock("../../../../hooks/reduxHooks/useActions.ts");
jest.mock("../../../../../../../client/src/util/Auth/verifyReg");
jest.mock("../../../../../../../client/src/util/setTocken");

describe("useHandleReg", () => {
    let registrationAction: jest.Mock;
    let setDefInputs: jest.Mock;
    let setNameErrorAction: jest.Mock;
    let setEmailErrorAction: jest.Mock;
    let setDefErrorInputs: jest.Mock;
    let setIsAuth: jest.Mock;

    beforeEach(() => {
        setIsAuth = jest.fn();
        registrationAction = jest.fn();
        setDefInputs = jest.fn();
        setNameErrorAction = jest.fn();
        setEmailErrorAction = jest.fn();
        setDefErrorInputs = jest.fn();

        (useActions as jest.Mock).mockReturnValue({
            registrationAction,
            setDefInputs,
            setNameErrorAction,
            setEmailErrorAction,
            setDefErrorInputs,
        });

        (useTypedSelector as jest.Mock).mockReturnValueOnce({
            name: "John",
            email: "john@example.com",
            password: "password123",
            regToken: null,
            regError: null,
            regLoading: false,
        });

        (setToken as jest.Mock).mockReturnValue(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthContext.Provider
            value={{
                setIsAuth,
                isAuth: false,
                tokenOutdated: false,
                setTokenOutdated: jest.fn(),
                isUser: false,
                setIsUser: jest.fn(),
                isGuest: false,
                setIsGuest: jest.fn(),
                isAuthLoading: false,
                setAuthLoading: jest.fn(),
                toggleShowFormPasswords: {
                    toggleShowPassword: false,
                    toggleShowConfirmPassword: false,
                },
                setToggleShowFormPasswords: jest.fn(),
                defToggleShowFormPasswords: {
                    toggleShowPassword: false,
                    toggleShowConfirmPassword: false,
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );

    test("должен обеспечить успешную регистрацию", async () => {
        (useTypedSelector as jest.Mock).mockReturnValue({
            name: "John",
            email: "john@example.com",
            password: "password123",
            regToken: null,
            regError: null,
            regLoading: false,
        });

        (verifyReg as jest.Mock).mockReturnValue(null);

        const {result} = renderHook(() => useHandleReg(), {wrapper});

        await act(async () => {
            await result.current.handleRegister({preventDefault: jest.fn()} as any);
        });

        expect(setDefErrorInputs).toHaveBeenCalled();
        expect(registrationAction).toHaveBeenCalledWith("John", "john@example.com", "password123");
        expect(setDefInputs).toHaveBeenCalled();
    });

    test("должен обработать ошибку регистрации", async () => {
        (useTypedSelector as jest.Mock).mockReturnValue({
            name: "John",
            email: "john@example.com",
            password: "password123",
            regToken: null,
            regError: null,
            regLoading: false,
        });

        (verifyReg as jest.Mock).mockReturnValue({regError: "Registration error"});

        const {result} = renderHook(() => useHandleReg(), {wrapper});

        await act(async () => {
            await result.current.handleRegister({preventDefault: jest.fn()} as any);
        });

        expect(result.current.regErrorState).toBe("Registration error");
        expect(registrationAction).not.toHaveBeenCalled();
    });

    test("должен обрабатывать ошибки проверки", async () => {
        (useTypedSelector as jest.Mock).mockReturnValue({
            name: "",
            email: "john@example.com",
            password: "password123",
            regToken: null,
            regError: null,
            regLoading: false,
        });

        (verifyReg as jest.Mock).mockReturnValue({ nameError: "Invalid name" });

        const { result } = renderHook(() => useHandleReg(), { wrapper });

        await act(async () => {
            await result.current.handleRegister({ preventDefault: jest.fn() } as any);
        });

        expect(setNameErrorAction).toHaveBeenCalledWith("Invalid name");
        expect(setDefInputs).toHaveBeenCalled();
        expect(registrationAction).not.toHaveBeenCalled();
    });

    test("следует установить токен и аутентифицировать пользователя", async () => {
        (useTypedSelector as jest.Mock).mockReturnValue({
            name: "John",
            email: "john@example.com",
            password: "password123",
            regToken: "sampleToken",
            regError: null,
            regLoading: false,
        });

        (verifyReg as jest.Mock).mockReturnValue(null);

        const { result } = renderHook(() => useHandleReg(), { wrapper });

        await act(async () => {
            await result.current.handleRegister({ preventDefault: jest.fn() } as any);
        });

        expect(setToken).toHaveBeenCalledWith(Tokens.userToken, "sampleToken");
        expect(setIsAuth).toHaveBeenCalledWith(true);
    });

    test("следует обновлять состояние ошибки при изменении regError", async () => {
        (useTypedSelector as jest.Mock)
            .mockReturnValueOnce({
                name: "John",
                email: "john@example.com",
                password: "password123",
                regToken: null,
                regError: "Some registration error",
                regLoading: false,
            });

        const { result, rerender } = renderHook(() => useHandleReg(), { wrapper });

        rerender();

        expect(result.current.regErrorState).toBe("Some registration error");
    });
});
