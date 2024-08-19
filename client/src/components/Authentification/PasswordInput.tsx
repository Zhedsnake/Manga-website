import React, {useContext, useEffect, useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import FormGroupDiv from "../UI/formGroupdiv/formGroupdiv";
import Label from "../UI/label/label";
import InputAuth from "../UI/inputAuth/InputAuth";
import ErrorForm from "../UI/errorForm/ErrorForm";
import PasswordToggleButton from "../UI/passwordToggleButton/PasswordToggleButton";
import PasswordContainer from "../UI/passwordContainer/PasswordContainer";
import {AuthContext} from "../../context";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

const PasswordInput: React.FC = () => {
    const {
        toggleShow,
        setToggleShow
    } = useContext(AuthContext);

    const [passwordForm, setPasswordForm] = useState('');
    const [passwordErrorForm, setPasswordErrorForm] = useState('');

    const { passwordError } = useTypedSelector(state => state.authForm);
    const {setPasswordAction} = useActions()

    useEffect(() => {
        setPasswordAction(passwordForm)
    }, [passwordForm])

    useEffect(() => {
        setPasswordErrorForm(passwordError)
    }, [passwordError])

    const handlerSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm(e.target.value)
    }


    return (
        <FormGroupDiv>
            <Label htmlFormName={"password"}>Пароль</Label>
            <PasswordContainer>
                <InputAuth
                  type={toggleShow.toggleShowPassword ? 'text' : 'password'}
                  id="password"
                  value={passwordForm}
                  maxLength={30}
                  onChange={handlerSetPassword}
                />
                <PasswordToggleButton
                    type="button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => setToggleShow({...toggleShow, toggleShowPassword: true})}
                >
                    <FontAwesomeIcon icon={toggleShow.toggleShowPassword ? faEyeSlash : faEye} />
                </PasswordToggleButton>
            </PasswordContainer>
            {passwordErrorForm && <ErrorForm>{passwordErrorForm}</ErrorForm>}
        </FormGroupDiv>
    );
};

export default PasswordInput;
