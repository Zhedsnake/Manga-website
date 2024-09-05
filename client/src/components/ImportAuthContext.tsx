import React, {useState} from 'react';
import {ToggleShowType} from "../types/authForm/authForm.ts";
import {AuthContext} from "../contexts/AuthContext.ts";

interface childrenProp {
    children: React.ReactNode;
}

const ImportAuthContext: React.FC<childrenProp> = ({children}) => {

    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [tokenOutdated, setTokenOutdated] = useState<boolean>(false)

    const [isUser, setIsUser] = useState<boolean>(false);
    const [isGuest, setIsGuest] = useState<boolean>(false);

    const [isAuthLoading, setAuthLoading] = useState<boolean>(true);

    const defToggleShowFormPasswords: ToggleShowType = {
        toggleShowPassword: false,
        toggleShowConfirmPassword: false
    };
    const [toggleShowFormPasswords, setToggleShowFormPasswords] = useState<ToggleShowType>({...defToggleShowFormPasswords});


    return (
        <AuthContext.Provider value={{
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
            defToggleShowFormPasswords,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default ImportAuthContext;