import React, {useEffect, useState} from 'react';

import InputAuth from "../UI/inputAuth/InputAuth";
import Label from "../UI/label/label";
import FormGroupDiv from "../UI/formGroupdiv/formGroupdiv";
import ErrorForm from "../UI/errorForm/ErrorForm";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const NameInput = () => {
    const { nameError } = useTypedSelector(state => state.authForm);
    const {setNameAction} = useActions()

    const [nameForm, setNameForm] = useState<string>('');
    const [nameErrorForm, setNameErrorForm] = useState<string>('');

    useEffect(() => {
        setNameAction(nameForm)
    }, [nameForm])

    useEffect(() => {
        setNameErrorForm(nameError)
    }, [nameError])

    const handlerSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameForm(e.target.value)
    }

    return (
        <FormGroupDiv>
            <Label htmlFormName={"name"}>Имя</Label>
            <InputAuth
                type="text"
                id="name"
                value={nameForm}
                maxLength={30}
                onChange={handlerSetName}
            />
            {nameErrorForm && <ErrorForm>{nameErrorForm}</ErrorForm>}
        </FormGroupDiv>
    );
};

export default NameInput;