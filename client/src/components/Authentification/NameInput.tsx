import React, {useEffect, useState} from 'react';

import InputAuth from "../UI/inputAuth/InputAuth";
import Label from "../UI/label/label";
import FormGroupDiv from "../UI/formGroupdiv/formGroupdiv";
import ErrorForm from "../UI/errorForm/ErrorForm";
import useInput from "../../hooks/useInput.ts";
import {setName} from "../../store/reducers/authForm/authFormSlice";
import {useAppSelector} from "../../hooks/reduxHooks-toolkit/useRedux.ts";

const NameInput = () => {
    const nameForm = useInput("")

    const [nameErrorForm, setNameErrorForm] = useState<string>('');

    // const { nameError } = useTypedSelector(state => state.authFormError);
    // const { name } = useTypedSelector(state => state.authForm);
    const { nameError } = useAppSelector(state => state.authFormError);
    const { name } = useAppSelector(state => state.authForm);
    // const {setNameAction} = useActions()

    useEffect(() => {
        setName(nameForm.value)
    }, [nameForm.value])

    useEffect(() => {
        setNameErrorForm(nameError)
    }, [nameError])

    useEffect(() => {
        nameForm.setValue(name)
    }, [name]);

    return (
        <FormGroupDiv>
            <Label htmlFormName={"name"}>Имя</Label>
            <InputAuth
                type="text"
                id="name"
                value={nameForm.value}
                maxLength={30}
                onChange={nameForm.onChange}
            />
            {nameErrorForm && <ErrorForm>{nameErrorForm}</ErrorForm>}
        </FormGroupDiv>
    );
};

export default NameInput;