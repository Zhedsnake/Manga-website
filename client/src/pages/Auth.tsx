import React, {useContext, useEffect} from 'react';
import {AuthContext, AuthContextType} from "../contexts/AuthContext.ts";
import {useActions} from "../../../buffer/client/src/hooks/reduxHooks/useActions.ts";
import Loader from "../components/UI/Loader/Loader.tsx";
import LogInForm from "../components/Authentification/LogInForm.tsx";
import FormButton from "../components/UI/formButton/FormButton.tsx";
import RegForm from "../components/Authentification/RegForm.tsx";
import useInput from "../hooks/useInput.ts";
import useHandleLogIn from "../hooks/Auth/useHandleLogIn.ts";
import useHandleReg from "../hooks/Auth/useHandleReg.ts";

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

    //! Патом переделать под redux toolkit
    
    const {defLogIn, defReg, setDefInputs} = useActions();

    const handleToggleForm = (prop: boolean) => {
        setDefInputs()
        setToggleShowFormPasswords({...defToggleShowFormPasswords});
        loggedEarlier.setValue(prop);
    };

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