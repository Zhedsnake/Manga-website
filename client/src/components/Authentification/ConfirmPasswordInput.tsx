import React, {useContext, useEffect, useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import FormGroupDiv from "../UI/formGroupdiv/formGroupdiv";
import Label from "../UI/label/label";
import PasswordContainer from "../UI/passwordContainer/PasswordContainer";
import InputAuth from "../UI/inputAuth/InputAuth";
import PasswordToggleButton from "../UI/passwordToggleButton/PasswordToggleButton";
import ErrorForm from "../UI/errorForm/ErrorForm";
import {AuthContext} from "../../context";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

const ConfirmPasswordInput: React.FC = () => {
    const {
        toggleShowFormPasswords,
        setToggleShowFormPasswords
    } = useContext(AuthContext);

    const { confirmPasswordError } = useTypedSelector(state => state.authForm);
    const {setConfirmPasswordAction} = useActions()

    const [confirmPasswordForm, setConfirmPasswordForm] = useState('');
    const [confirmPasswordErrorForm, setConfirmPasswordErrorForm] = useState('');

    useEffect(() => {
        setConfirmPasswordAction(confirmPasswordForm)
    }, [confirmPasswordForm])

    useEffect(() => {
        setConfirmPasswordErrorForm(confirmPasswordError)
    }, [confirmPasswordError])

    const handlerSetConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPasswordForm(e.target.value)
    }


    return (
        <FormGroupDiv>
            <Label htmlFormName={"confirmPassword"}>Подтвердить пароль</Label>
            <PasswordContainer>
                <InputAuth
                    type={toggleShowFormPasswords.toggleShowConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPasswordForm}
                    maxLength={30}
                    onChange={handlerSetConfirmPassword}
                />
                <PasswordToggleButton
                    type="button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => setToggleShowFormPasswords({...toggleShowFormPasswords, toggleShowConfirmPassword: true})}
                >
                    <FontAwesomeIcon icon={toggleShowFormPasswords.toggleShowConfirmPassword ? faEyeSlash : faEye} />
                </PasswordToggleButton>
            </PasswordContainer>
            {confirmPasswordErrorForm && <ErrorForm>{confirmPasswordErrorForm}</ErrorForm>}
        </FormGroupDiv>
    );
};

export default ConfirmPasswordInput;
