import React, {useContext, useEffect, useState} from "react";
import {useTypedSelector} from "../useTypedSelector";
import {useActions} from "../useActions";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext";
import {setToken} from "../../util/setTocken";
import {Tokens} from "../../util/Tokens";
import verifyReg from "../../util/Auth/verifyReg";

export default function useHandleReg() {
    const {
        setIsAuth,
    } = useContext<AuthContextType>(AuthContext);

    const [regErrorState, setRegError] = useState<string>("")

    const {name, email, password} = useTypedSelector(state => state.authForm);
    const {regToken, regError, regLoading} = useTypedSelector(state => state.registration);
    const {registrationAction, setDefInputs, setNameErrorAction, setEmailErrorAction, setDefErrorInputs} = useActions();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();


        const verificationResponse: { regError: string } | { nameError: string } | { emailError: string } | { passwordError: string } | null = verifyReg(name, email, password)
        if (verificationResponse) {
            if ("regError" in verificationResponse) {
                setRegError(verificationResponse.regError)
            } else if ("nameError" in verificationResponse) {
                setNameErrorAction(verificationResponse.nameError)
            } else if ("emailError" in verificationResponse) {
                setEmailErrorAction(verificationResponse.emailError)
            }

            setDefInputs()
        }

        if (name && email && password && !verificationResponse) {

            setDefErrorInputs()

            await registrationAction(name, email, password);

            setDefInputs()
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