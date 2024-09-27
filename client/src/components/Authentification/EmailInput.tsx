import React, {useContext, useEffect, useMemo, useState} from 'react';

import FormGroupDiv from "../UI/formGroupdiv/formGroupdiv";
import Label from "../UI/label/label";
import InputAuth from "../UI/inputAuth/InputAuth";
import ErrorForm from "../UI/errorForm/ErrorForm";
import {useTypedSelector} from "../../../../buffer/client/src/__tests__/unit/hooks/reduxHooks/useTypedSelector.ts";
import {useActions} from "../../../../buffer/client/src/__tests__/unit/hooks/reduxHooks/useActions.ts";
import useInput from "../../hooks/useInput.ts";

const EmailInput = () => {
    const emailForm = useInput("")

    const [emailErrorForm, setEmailErrorForm] = useState('');

    const { emailError } = useTypedSelector(state => state.authFormError);
    const { email } = useTypedSelector(state => state.authForm);
    const {setEmailAction} = useActions()


    useEffect(() => {
        setEmailAction(emailForm.value)
    }, [emailForm.value])

    useEffect(() => {
        setEmailErrorForm(emailError)
    }, [emailError])

    useEffect(() => {
        emailForm.setValue(email)
    }, [email]);

    return (
        <FormGroupDiv>
            <Label htmlFormName={"email"}>Электронная почта</Label>
            <InputAuth
                type="email"
                id="email"
                maxLength={30}
                value={emailForm.value}
                onChange={emailForm.onChange}
            />
            {emailErrorForm && <ErrorForm>{emailErrorForm}</ErrorForm>}
        </FormGroupDiv>
    );
};

export default EmailInput;
