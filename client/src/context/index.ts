import {createContext, Dispatch, SetStateAction} from "react";

export interface AuthContextType {
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
    }>>
}


export const AuthContext = createContext<AuthContextType>();
