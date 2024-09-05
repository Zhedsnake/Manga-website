import React, {useContext, useEffect, useState} from "react";
import {useTypedSelector} from "../useTypedSelector.ts";
import {useActions} from "../useActions.ts";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext.ts";
import verifyName from "../../util/Verification/verifyName.ts";
import verifyEditName from "../../util/Verification/EditUserInfo/verifyEditName.ts";
import {EditUserInfoContext, EditUserInfoContextType} from "../../contexts/EditUserInfoContext.ts";

export default function useHandleEditName(name, clear) {
    const {
        setMessage
    } = useContext<EditUserInfoContextType>(EditUserInfoContext);

    const [error, setError] = useState<string>("")

    const {loading: nameLoading, error: nameError} = useTypedSelector(state => state.nameForm);
    const {editName} = useActions();

    const handleEditName = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("")

        const verifyResponse= verifyEditName(name);
        if (verifyResponse) {
            setError(verifyResponse.nameError)

            clear()
        }


        if (name && !verifyResponse) {
            await editName(name);

            clear()
        }

    }

    useEffect(() => {
        setError(nameError)
    }, [nameError]);


    return {
        nameLoading,
        error,
        handleEditName
    };
}