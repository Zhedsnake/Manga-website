import {createContext, Dispatch, SetStateAction} from "react";

export interface AuthContextType {
    isAuth: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
}


export const AuthContext = createContext<AuthContextType>();
