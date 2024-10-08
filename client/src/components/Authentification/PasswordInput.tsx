import React, {useContext, useEffect, useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import FormGroupDiv from "../UI/formGroupdiv/formGroupdiv";
import Label from "../UI/label/label";
import InputAuth from "../UI/inputAuth/InputAuth";
import ErrorForm from "../UI/errorForm/ErrorForm";
import PasswordToggleButton from "../UI/passwordToggleButton/PasswordToggleButton";
import PasswordContainer from "../UI/passwordContainer/PasswordContainer";
import {AuthContext} from "../../contexts/AuthContext.ts";
import useInput from "../../hooks/useInput.ts";
import {useAppSelector} from "../../hooks/reduxHooks-toolkit/useRedux.ts";
import {setPassword} from "../../store/reducers/authForm/authFormSlice";

const PasswordInput: React.FC = () => {
    const {
        toggleShowFormPasswords,
        setToggleShowFormPasswords
    } = useContext(AuthContext);

    const passwordForm = useInput("")

    const [passwordErrorForm, setPasswordErrorForm] = useState('');

    // const { passwordError } = useTypedSelector(state => state.authFormError);
    // const { password } = useTypedSelector(state => state.authForm);
    // const {setPasswordAction} = useActions()
    const { passwordError } = useAppSelector(state => state.authFormError);
    const { password } = useAppSelector(state => state.authForm);

    useEffect(() => {
        setPassword(passwordForm.value)
    }, [passwordForm.value])

    useEffect(() => {
        setPasswordErrorForm(passwordError)
    }, [passwordError])

    useEffect(() => {
        passwordForm.setValue(password)
    }, [password]);

    return (
        <FormGroupDiv>
            <Label htmlFormName={"password"}>Пароль</Label>
            <PasswordContainer>
                <InputAuth
                  type={toggleShowFormPasswords.toggleShowPassword ? 'text' : 'password'}
                  id="password"
                  value={passwordForm.value}
                  maxLength={30}
                  onChange={passwordForm.onChange}
                />
                <PasswordToggleButton
                    type="button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => setToggleShowFormPasswords({...toggleShowFormPasswords, toggleShowPassword: true})}
                >
                    <FontAwesomeIcon icon={toggleShowFormPasswords.toggleShowPassword ? faEyeSlash : faEye} />
                </PasswordToggleButton>
            </PasswordContainer>
            {passwordErrorForm && <ErrorForm>{passwordErrorForm}</ErrorForm>}
        </FormGroupDiv>
    );
};

export default PasswordInput;
