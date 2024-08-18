import {createContext, Dispatch, SetStateAction} from "react";

export interface AuthContextType {
    isUser: boolean;
    setIsUser: Dispatch<SetStateAction<boolean>>;
    isGuest: boolean;
    setIsGuest: Dispatch<SetStateAction<boolean>>;
    isAuthLoading: boolean;
    setAuthLoading: Dispatch<SetStateAction<boolean>>;
}


export const AuthContext = createContext<AuthContextType>();
