import { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext, AuthContextType } from "../../../contexts/AuthContext.ts";

const TestComponent = () => {
    const {
        isAuth,
        setIsAuth,
        tokenOutdated,
        setTokenOutdated,
        isUser,
        setIsUser,
        isGuest,
        setIsGuest,
        isAuthLoading,
        setAuthLoading,
        toggleShowFormPasswords,
        setToggleShowFormPasswords,
        defToggleShowFormPasswords
    } = useContext<AuthContextType>(AuthContext);

    return (
        <div>
            <div data-testid="isAuth">{isAuth ? "Authenticated" : "Not Authenticated"}</div>
            <div data-testid="tokenOutdated">{tokenOutdated ? "Token Outdated" : "Token Valid"}</div>
            <div data-testid="isUser">{isUser ? "User" : "Not User"}</div>
            <div data-testid="isGuest">{isGuest ? "Guest" : "Not Guest"}</div>
            <div data-testid="isAuthLoading">{isAuthLoading ? "Loading" : "Not Loading"}</div>
            <div data-testid="toggleShowPassword">{toggleShowFormPasswords.toggleShowPassword ? "Password Shown" : "Password Hidden"}</div>
            <div data-testid="toggleShowConfirmPassword">{toggleShowFormPasswords.toggleShowConfirmPassword ? "Confirm Password Shown" : "Confirm Password Hidden"}</div>

            <div data-testid="defToggleShowPassword">{defToggleShowFormPasswords.toggleShowPassword ? "Default Password Shown" : "Default Password Hidden"}</div>
            <div data-testid="defToggleShowConfirmPassword">{defToggleShowFormPasswords.toggleShowConfirmPassword ? "Default Confirm Password Shown" : "Default Confirm Password Hidden"}</div>

            <button onClick={() => setIsAuth(true)} data-testid="auth-btn">Authenticate</button>
            <button onClick={() => setTokenOutdated(true)} data-testid="token-btn">Set Token Outdated</button>
            <button onClick={() => setIsUser(true)} data-testid="user-btn">Set User</button>
            <button onClick={() => setIsGuest(true)} data-testid="guest-btn">Set Guest</button>
            <button onClick={() => setAuthLoading(true)} data-testid="loading-btn">Set Loading</button>
            <button onClick={() => setToggleShowFormPasswords({ toggleShowPassword: true, toggleShowConfirmPassword: true })} data-testid="toggle-btn">Toggle Passwords</button>
        </div>
    );
};

describe("AuthContext", () => {

    test("должен обновлять значения контекста при вызове set-функций", () => {
        const setIsAuth = jest.fn();
        const setTokenOutdated = jest.fn();
        const setIsUser = jest.fn();
        const setIsGuest = jest.fn();
        const setAuthLoading = jest.fn();
        const setToggleShowFormPasswords = jest.fn();

        render(
            <AuthContext.Provider value={{
                isAuth: false,
                setIsAuth,
                tokenOutdated: false,
                setTokenOutdated,
                isUser: false,
                setIsUser,
                isGuest: false,
                setIsGuest,
                isAuthLoading: false,
                setAuthLoading,
                toggleShowFormPasswords: {
                    toggleShowPassword: false,
                    toggleShowConfirmPassword: false,
                },
                setToggleShowFormPasswords,
                defToggleShowFormPasswords: {
                    toggleShowPassword: false,
                    toggleShowConfirmPassword: false,
                },
            }}>
                <TestComponent />
            </AuthContext.Provider>
        );

        fireEvent.click(screen.getByTestId("auth-btn"));
        expect(setIsAuth).toHaveBeenCalledWith(true);

        fireEvent.click(screen.getByTestId("token-btn"));
        expect(setTokenOutdated).toHaveBeenCalledWith(true);

        fireEvent.click(screen.getByTestId("user-btn"));
        expect(setIsUser).toHaveBeenCalledWith(true);

        fireEvent.click(screen.getByTestId("guest-btn"));
        expect(setIsGuest).toHaveBeenCalledWith(true);

        fireEvent.click(screen.getByTestId("loading-btn"));
        expect(setAuthLoading).toHaveBeenCalledWith(true);

        fireEvent.click(screen.getByTestId("toggle-btn"));
        expect(setToggleShowFormPasswords).toHaveBeenCalledWith({
            toggleShowPassword: true,
            toggleShowConfirmPassword: true,
        });
    });

    test("должен использовать значения по умолчанию", () => {

        render(
            <AuthContext.Provider value={{
                isAuth: false,
                setIsAuth: jest.fn(),
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
            }}>
                <TestComponent />
            </AuthContext.Provider>
        );

        expect(screen.getByTestId("isAuth").textContent).toBe("Not Authenticated");
        expect(screen.getByTestId("tokenOutdated").textContent).toBe("Token Valid");
        expect(screen.getByTestId("isUser").textContent).toBe("Not User");
        expect(screen.getByTestId("isGuest").textContent).toBe("Not Guest");
        expect(screen.getByTestId("isAuthLoading").textContent).toBe("Not Loading");
        expect(screen.getByTestId("toggleShowPassword").textContent).toBe("Password Hidden");
        expect(screen.getByTestId("toggleShowConfirmPassword").textContent).toBe("Confirm Password Hidden");

        expect(screen.getByTestId("defToggleShowPassword").textContent).toBe("Default Password Hidden");
        expect(screen.getByTestId("defToggleShowConfirmPassword").textContent).toBe("Default Confirm Password Hidden");
    });
});
