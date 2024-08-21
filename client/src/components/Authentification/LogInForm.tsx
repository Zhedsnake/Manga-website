import React from 'react';
import FormAuth from "../UI/formAuth/FormAuth";
import AuthHeader from "../UI/authHeader/AuthHeader";
import NameInput from "./NameInput";
import PasswordInput from "./PasswordInput";
import FormButton from "../UI/formButton/FormButton";

interface HandleLogInType {
    handleLogIn:(e: React.FormEvent) => Promise<void>;
}

const LogInForm: React.FC<HandleLogInType> = ({handleLogIn}) => {

    return (
        <FormAuth>
            <AuthHeader>Вход</AuthHeader>
            <NameInput />
            <PasswordInput />
            <FormButton onClick={handleLogIn}>Войти</FormButton>
        </FormAuth>
    );
};

export default LogInForm;