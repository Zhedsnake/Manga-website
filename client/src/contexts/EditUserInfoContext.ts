import {createContext, Dispatch, SetStateAction} from "react";

export interface EditUserInfoContextType {
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
}


export const EditUserInfoContext = createContext<EditUserInfoContextType>();
