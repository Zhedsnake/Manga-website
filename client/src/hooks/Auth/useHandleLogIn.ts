import React, { useContext, useEffect, useState } from "react";
import {useActions} from "../useActions";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import verifyLogin from "../../util/Auth/verifyLogin";
import { setToken } from "../../util/setTocken";
import { Tokens } from "../../util/Tokens";
import {useAppSelector} from "../reduxHooks-toolkit/useRedux.ts";
import {setNameError, setPasswordError, defAuthFormError} from "../../store/reducers/authForm/authFormErrorSlice";
import {defAuthForm} from "../../store/reducers/authForm/authFormSlice";

export default function useHandleLogIn() {
    const { setIsAuth } = useContext<AuthContextType>(AuthContext);

    const [loginError, setLoginError] = useState("");

    // const { name, email, password } = useTypedSelector((state) => state.authForm);
    // const { logInToken, logInError, logInLoading } = useTypedSelector((state) => state.logIn);
    const { name, email, password } = useAppSelector((state) => state.authForm);
    const { logInToken, logInError, logInLoading } = useAppSelector((state) => state.logIn);

    const { logIn } = useActions();

    const handleLogIn = async (e: React.FormEvent) => {
        e.preventDefault();

        const verificationResponse:
            | { loginError: string }
            | { nameError: string }
            | { passwordError: string }
            | null = verifyLogin(name, password);

        if (verificationResponse) {
            if ("loginError" in verificationResponse) {
                setLoginError(verificationResponse.loginError);
            } else if ("nameError" in verificationResponse) {
                setNameError(verificationResponse.nameError);
            } else if ("passwordError" in verificationResponse) {
                setPasswordError(verificationResponse.passwordError);
            }

            defAuthForm();
        }

        if (name && email && password && !verificationResponse) {
            defAuthFormError();
            await logIn(name, password);
            defAuthForm();
        }
    };

    useEffect(() => {
        if (logInError) {
            setLoginError(logInError);
        }
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
        handleLogIn,
    };
}
