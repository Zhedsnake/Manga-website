import React, {useEffect} from 'react';
import FormAuth from "../UI/formAuth/FormAuth";
import AuthHeader from "../UI/authHeader/AuthHeader";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import FormButton from "../UI/formButton/FormButton";

interface HandleRegisterType {
    handleRegister:(e: React.FormEvent) => Promise<void>;
}

const RegForm: React.FC<HandleRegisterType> = ({handleRegister}) => {

    return (
        <FormAuth>
            <AuthHeader>Регистрация</AuthHeader>
            <NameInput />
            <EmailInput />
            <PasswordInput />
            <ConfirmPasswordInput />
            <FormButton onClick={handleRegister}>Зарегистрироваться</FormButton>
        </FormAuth>
    );
};

export default RegForm;