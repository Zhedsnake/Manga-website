import React from 'react';
import FormAuth from "../UI/formAuth/FormAuth";
import AuthHeader from "../UI/authHeader/AuthHeader";
import NameInput from "./NameInput";
import PasswordInput from "./PasswordInput";
import FormButton from "../UI/formButton/FormButton";
import useHandleLogIn from "../../hooks/Auth/useHandleLogIn.ts";

const LogInForm: React.FC = () => {

    const handleLogIn = useHandleLogIn()

    return (
        <FormAuth>
            <AuthHeader>Вход</AuthHeader>
            <NameInput />
            <PasswordInput />
            <FormButton onClick={handleLogIn.handleLogIn}>Войти</FormButton>
        </FormAuth>
    );
};

export default LogInForm;