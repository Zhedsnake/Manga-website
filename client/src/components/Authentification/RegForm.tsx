import React from 'react';
import FormAuth from "../UI/formAuth/FormAuth";
import AuthHeader from "../UI/authHeader/AuthHeader";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import FormButton from "../UI/formButton/FormButton";
import useHandleReg from "../../hooks/Auth/useHandleReg.ts";

interface HandleRegisterType {
    handleRegister:(e: React.FormEvent) => Promise<void>;
}

const RegForm: React.FC<HandleRegisterType> = () => {

    const handleRegister = useHandleReg()

    return (
        <FormAuth>
            <AuthHeader>Регистрация</AuthHeader>
            <NameInput />
            <EmailInput />
            <PasswordInput />
            <FormButton onClick={handleRegister.handleRegister}>Зарегистрироваться</FormButton>
        </FormAuth>
    );
};

export default RegForm;