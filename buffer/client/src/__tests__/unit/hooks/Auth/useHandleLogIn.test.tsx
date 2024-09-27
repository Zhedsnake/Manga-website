import {renderHook, act} from "@testing-library/react";
import useHandleLogIn from "../../../../../../../client/src/hooks/Auth/useHandleLogIn";
import {useTypedSelector} from "../../../../../../../client/src/hooks/reduxHooks/useTypedSelector.ts";
import {useActions} from "../../../../../../../client/src/hooks/reduxHooks/useActions.ts";
import {AuthContext} from "../../../../../../../client/src/contexts/AuthContext";
import verifyLogin from "../../../../../../../client/src/util/Auth/verifyLogin";
import {setToken} from "../../../../../../../client/src/util/setTocken";
import {Tokens} from "../../../../../../../client/src/util/Tokens";

jest.mock("../../../../../../../client/src/hooks/reduxHooks/useTypedSelector.ts");
jest.mock("../../../../../../../client/src/hooks/reduxHooks/useActions.ts");
jest.mock("../../../../../../../client/src/util/Auth/verifyLogin");
jest.mock("../../../../../../../client/src/util/setTocken");

describe("useHandleLogIn", () => {
    let logInAction: jest.Mock;
    let setDefInputs: jest.Mock;
    let setNameErrorAction: jest.Mock;
    let setPasswordErrorAction: jest.Mock;
    let setDefErrorInputs: jest.Mock;
    let setIsAuth: jest.Mock;

    beforeEach(() => {
        setIsAuth = jest.fn();
        logInAction = jest.fn();
        setDefInputs = jest.fn();
        setNameErrorAction = jest.fn();
        setPasswordErrorAction = jest.fn();
        setDefErrorInputs = jest.fn();

        (useActions as jest.Mock).mockReturnValue({
            logInAction,
            setDefInputs,
            setNameErrorAction,
            setPasswordErrorAction,
            setDefErrorInputs,
        });

        (useTypedSelector as jest.Mock).mockReturnValueOnce({
            name: "John",
            email: "john@example.com",
            password: "password123",
            logInToken: null,
            logInError: null,
            logInLoading: false,
        });

        (setToken as jest.Mock).mockReturnValue(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const wrapper = ({children}: { children: React.ReactNode }) => (
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

    test("должен успешно войти", async () => {
        (useTypedSelector as jest.Mock).mockReturnValue({
            name: "John",
            email: "john@example.com",
            password: "password123",
            logInToken: null,
            logInError: null,
            logInLoading: false,
        });

        (verifyLogin as jest.Mock).mockReturnValue(null);

        const {result} = renderHook(() => useHandleLogIn(), {wrapper});

        await act(async () => {
            await result.current.handleLogIn({preventDefault: jest.fn()} as any);
        });

        expect(setDefErrorInputs).toHaveBeenCalled();
        expect(logInAction).toHaveBeenCalledWith("John", "password123");
        expect(setDefInputs).toHaveBeenCalled();
    });

    test("должен обработать ошибку входа", async () => {
        (useTypedSelector as jest.Mock).mockReturnValue({
            name: "John",
            email: "john@example.com",
            password: "password123",
            logInToken: null,
            logInError: null,
            logInLoading: false,
        });

        (verifyLogin as jest.Mock).mockReturnValue({loginError: "Login error"});

        const {result} = renderHook(() => useHandleLogIn(), {wrapper});

        await act(async () => {
            await result.current.handleLogIn({preventDefault: jest.fn()} as any);
        });

        expect(result.current.loginError).toBe("Login error");
        expect(logInAction).not.toHaveBeenCalled();
    });

    test("следует установить токен и аутентифицировать пользователя", async () => {
        (useTypedSelector as jest.Mock).mockReturnValue({
            name: "John",
            email: "john@example.com",
            password: "password123",
            logInToken: "sampleToken",
            logInError: null,
            logInLoading: false,
        });

        (verifyLogin as jest.Mock).mockReturnValue(null);

        const {result} = renderHook(() => useHandleLogIn(), {wrapper});

        await act(async () => {
            await result.current.handleLogIn({preventDefault: jest.fn()} as any);
        });

        expect(setToken).toHaveBeenCalledWith(Tokens.userToken, "sampleToken");
        expect(setIsAuth).toHaveBeenCalledWith(true);
    });

    test("следует обновлять состояние ошибки при изменении logInError", async () => {
        (useTypedSelector as jest.Mock)
            .mockReturnValueOnce({
                name: "John",
                email: "john@example.com",
                password: "password123",
                logInToken: null,
                logInError: "Some login error",
                logInLoading: false,
            });

        const {result, rerender} = renderHook(() => useHandleLogIn(), {wrapper});

        rerender();

        expect(result.current.loginError).toBe("Some login error");
    });
});
