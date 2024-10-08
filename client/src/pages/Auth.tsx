import React, {useContext, useEffect} from 'react';
import {AuthContext, AuthContextType} from "../contexts/AuthContext";
import Loader from "../components/UI/Loader/Loader";
import LogInForm from "../components/Authentification/LogInForm";
import FormButton from "../components/UI/formButton/FormButton";
import RegForm from "../components/Authentification/RegForm";
import useInput from "../hooks/useInput.ts";
import useHandleLogIn from "../hooks/Auth/useHandleLogIn";
import useHandleReg from "../hooks/Auth/useHandleReg.ts";
import { defAuthForm } from '../store/reducers/authForm/authFormSlice';
import {defLogIn} from '../store/reducers/logIn-Registration/logInSlice';
import {defRegistration} from '../store/reducers/logIn-Registration/registrationSlice';


const Auth: React.FC = () => {
    const {
        setToggleShowFormPasswords,
        defToggleShowFormPasswords
    } = useContext<AuthContextType>(AuthContext);

    const loggedEarlier = useInput<boolean>(false)
    const logInErrorState = useInput<string>("")
    const regErrorState = useInput<string>("")

    const handleLogIn = useHandleLogIn()
    const handleReg = useHandleReg()

    const handleToggleForm = (prop: boolean) => {
        defAuthForm()
        setToggleShowFormPasswords({...defToggleShowFormPasswords});
        loggedEarlier.setValue(prop);
    };

    useEffect(() => {
        return () => {
            setToggleShowFormPasswords({...defToggleShowFormPasswords});
            defLogIn()
            defRegistration()
            defAuthForm()
        };
    }, []);

    return (
        <div className="auth">
            <main className="auth__form-container">
                {loggedEarlier.value ? (
                    handleLogIn.logInLoading ? (
                        <Loader/>
                    ) : (
                        <>
                            {logInErrorState.value && <h1>{logInErrorState.value}</h1>}
                            <LogInForm/>
                            <FormButton onClick={() => handleToggleForm(false)}>Переключитесь на
                                регистрацию</FormButton>
                        </>
                    )
                ) : (
                    handleReg.regLoading ? (
                        <Loader/>
                    ) : (
                        <>
                            {regErrorState.value && <h1>{regErrorState.value}</h1>}
                            <RegForm/>
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