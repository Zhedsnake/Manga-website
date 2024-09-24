import {createContext, Dispatch, SetStateAction} from "react";

export interface AuthContextType {
    isAuth: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
    tokenOutdated: boolean;
    setTokenOutdated: Dispatch<SetStateAction<boolean>>;
    isUser: boolean;
    setIsUser: Dispatch<SetStateAction<boolean>>;
    isGuest: boolean;
    setIsGuest: Dispatch<SetStateAction<boolean>>;
    isAuthLoading: boolean;
    setAuthLoading: Dispatch<SetStateAction<boolean>>;
    toggleShowFormPasswords: {
        toggleShowPassword: boolean,
        toggleShowConfirmPassword: boolean
    },
    setToggleShowFormPasswords: Dispatch<SetStateAction<{
        toggleShowPassword: boolean,
        toggleShowConfirmPassword: boolean
    }>>,
    defToggleShowFormPasswords: {
        toggleShowPassword: boolean,
        toggleShowConfirmPassword: boolean
    }
}

export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => {},
    tokenOutdated: false,
    setTokenOutdated: () => {},
    isUser: false,
    setIsUser: () => {},
    isGuest: false,
    setIsGuest: () => {},
    isAuthLoading: false,
    setAuthLoading: () => {},
    toggleShowFormPasswords: {
        toggleShowPassword: false,
        toggleShowConfirmPassword: false
    },
    setToggleShowFormPasswords: () => {},
    defToggleShowFormPasswords: {
        toggleShowPassword: false,
        toggleShowConfirmPassword: false
    }
});
