import React, {useContext, useEffect, useMemo, useState} from 'react';

import FormGroupDiv from "../UI/formGroupdiv/formGroupdiv";
import Label from "../UI/label/label";
import InputAuth from "../UI/inputAuth/InputAuth";
import ErrorForm from "../UI/errorForm/ErrorForm";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

const EmailInput = () => {
    const { emailError } = useTypedSelector(state => state.authForm);
    const {setEmailAction} = useActions()

    const [emailForm, setEmailForm] = useState('');
    const [emailErrorForm, setEmailErrorForm] = useState('');

    useEffect(() => {
        setEmailAction(emailForm)
    }, [emailForm])

    useEffect(() => {
        setEmailErrorForm(emailError)
    }, [emailError])

    const handlerSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailForm(e.target.value)
    }

    return (
        <FormGroupDiv>
            <Label htmlFormName={"email"}>Электронная почта</Label>
            <InputAuth
                type="email"
                id="email"
                maxLength={30}
                value={emailForm}
                onChange={handlerSetEmail}
            />
            {emailErrorForm && <ErrorForm>{emailErrorForm}</ErrorForm>}
        </FormGroupDiv>
    );
};

export default EmailInput;
