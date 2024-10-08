import React, {useContext, useEffect, useState} from "react";
import {useActions} from "../useActions";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext";
import {setToken} from "../../util/setTocken";
import {Tokens} from "../../util/Tokens";
import verifyReg from "../../util/Auth/verifyReg";
import {useAppSelector} from "../reduxHooks-toolkit/useRedux.ts";
import {setNameError, setEmailError, defAuthFormError} from "../../store/reducers/authForm/authFormErrorSlice";
import {defAuthForm} from "../../store/reducers/authForm/authFormSlice";

export default function useHandleReg() {
    const {
        setIsAuth,
    } = useContext<AuthContextType>(AuthContext);

    const [regErrorState, setRegError] = useState<string>("")

    // const {name, email, password} = useTypedSelector(state => state.authForm);
    // const {regToken, regError, regLoading} = useTypedSelector(state => state.registration);
    const {name, email, password} = useAppSelector(state => state.authForm);
    const {regToken, regError, regLoading} = useAppSelector(state => state.registration);
    const {registration} = useActions();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();


        const verificationResponse: { regError: string } | { nameError: string } | { emailError: string } | { passwordError: string } | null = verifyReg(name, email, password)
        if (verificationResponse) {
            if ("regError" in verificationResponse) {
                setRegError(verificationResponse.regError)
            } else if ("nameError" in verificationResponse) {
                setNameError(verificationResponse.nameError)
            } else if ("emailError" in verificationResponse) {
                setEmailError(verificationResponse.emailError)
            }

            defAuthForm()
        }

        if (name && email && password && !verificationResponse) {

            defAuthFormError()

            await registration(name, email, password);

            defAuthForm()
        }
    };

    useEffect(() => {
        if (regError){
            console.log("Ошибка от сервера", regError)
            console.log("Токен от сервера", regToken)
            setRegError(regError);
        }
    }, [regError]);

    useEffect(() => {
        if (regToken) {
            const tokenIsSet: boolean = setToken(Tokens.userToken, regToken);
            if (tokenIsSet) {
                setIsAuth(tokenIsSet);
            }
        }
    }, [regToken]);


    return {
        regLoading,
        regErrorState,
        handleRegister
    };
}