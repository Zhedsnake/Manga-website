import React, {useContext, useEffect, useState} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector.ts";
import {AuthContext, AuthContextType} from "../context";
import {useActions} from "../hooks/useActions.ts";
import {setToken} from "../util/setTocken.ts";
import Loader from "../components/UI/Loader/Loader.tsx";
import LogInForm from "../components/Authentification/LogInForm.tsx";
import FormButton from "../components/UI/formButton/FormButton.tsx";
import RegForm from "../components/Authentification/RegForm.tsx";
import {Tokens} from "../util/Tokens.ts";

const Auth: React.FC = () => {
    const [loggedEarlier, setLoggedEarlier] = useState<boolean>(false);
    const {
        setIsAuth,
        setToggleShowFormPasswords,
        defToggleShowFormPasswords
    } = useContext<AuthContextType>(AuthContext);


    const {name, email, password} = useTypedSelector(state => state.authForm);
    const {logInToken, logInError, logInLoading} = useTypedSelector(state => state.logIn);
    const {regToken, regError, regLoading} = useTypedSelector(state => state.registration);
    const {logInAction, registrationAction, defLogIn, defReg, setDefInputs, defGuestToken} = useActions();


    const handleLogIn = async (e: React.FormEvent) => {
        e.preventDefault();
        await logInAction(name, email, password);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        await registrationAction(name, email, password);
    };

    const handleToggleForm = (prop: boolean) => {
        setDefInputs()
        setToggleShowFormPasswords({...defToggleShowFormPasswords});
        setLoggedEarlier(prop);
    };

    useEffect(() => {
        if (logInToken) {
            const tokenIsSet: boolean = setToken(Tokens.userToken, logInToken);

            if (tokenIsSet) {
                setIsAuth(tokenIsSet);
            }

            defGuestToken()
        }
    }, [logInToken]);

    useEffect(() => {
        if (regToken) {
            const tokenIsSet: boolean = setToken(Tokens.userToken, regToken);

            if (tokenIsSet) {
                setIsAuth(tokenIsSet);
            }

            defGuestToken()
        }
    }, [regToken]);

    useEffect(() => {
        return () => {
            setToggleShowFormPasswords({...defToggleShowFormPasswords});
            defLogIn()
            defReg()
            setDefInputs()
        };
    }, []);

    return (
        <div className="auth">
            <main className="auth__form-container">
                {loggedEarlier ? (
                    logInLoading ? (
                        <Loader/>
                    ) : (
                        <>
                            {logInError && <h1>{logInError}</h1>}
                            <LogInForm
                                handleLogIn={handleLogIn}
                            />
                            <FormButton onClick={() => handleToggleForm(false)}>Переключитесь на
                                регистрацию</FormButton>
                        </>
                    )
                ) : (
                    regLoading ? (
                        <Loader/>
                    ) : (
                        <>
                            {regError && <h1>{regError}</h1>}
                            <RegForm
                                handleRegister={handleRegister}
                            />
                            <FormButton onClick={() => handleToggleForm(true)}>Переключитесь на вход в
                                систему</FormButton>
                        </>
                    )
                )}
            </main>
        </div>
    );
};

export default Auth;