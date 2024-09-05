import React, {useContext, useEffect, useState} from "react";
import {useTypedSelector} from "../useTypedSelector.ts";
import {useActions} from "../useActions.ts";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext.ts";
import verifyLogin from "../../util/Auth/verifyLogin.tsx";
import {setToken} from "../../util/setTocken.ts";
import {Tokens} from "../../util/Tokens.ts";

export default function useHandleLogIn() {
    const {
        setIsAuth,
    } = useContext<AuthContextType>(AuthContext);

    const [loginError, setLoginError] = useState("")

    const {name, email, password} = useTypedSelector(state => state.authForm);
    const {logInToken, logInError, logInLoading} = useTypedSelector(state => state.logIn);
    const {logInAction, setDefInputs, setNameErrorAction, setPasswordErrorAction, setDefErrorInputs} = useActions();

    const handleLogIn = async (e: React.FormEvent) => {
        e.preventDefault();


        const verificationResponse: { loginError: string } | { nameError: string } | { passwordError: string } | null = verifyLogin(name, password)
        if (verificationResponse) {
            if ("loginError" in verificationResponse) {
                setLoginError(verificationResponse.loginError)
            } else if ("nameError" in verificationResponse) {
                setNameErrorAction(verificationResponse.nameError)
            } else if ("passwordError" in verificationResponse) {
                setPasswordErrorAction(verificationResponse.passwordError)
            }

            setDefInputs()
        }

        if (name && email && password && !verificationResponse) {

            setDefErrorInputs()

            await logInAction(name, password);

            setDefInputs()
        }
    };

    useEffect(() => {
        setLoginError(logInError)
    }, [logInError]);

    useEffect(() => {
        if (logInToken) {
            const tokenIsSet: boolean = setToken(Tokens.userToken, logInToken);

            if (tokenIsSet) {
                setIsAuth(tokenIsSet);
            }
        }
    }, [logInToken]);


    return {
        logInLoading,
        loginError,
        handleLogIn
    };
}