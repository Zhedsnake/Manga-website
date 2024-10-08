import React, { useContext, useEffect, useState } from "react";
import { useActions } from "../useActions";
import verifyEditName from "../../util/Verification/EditUserInfo/verifyEditName";
import { EditUserInfoContext, EditUserInfoContextType } from "../../contexts/EditUserInfoContext";
import {useAppSelector} from "../reduxHooks-toolkit/useRedux";

export default function useHandleEditName(name: string, clear: () => void) {
    const { setMessage } = useContext<EditUserInfoContextType>(EditUserInfoContext);

    const [error, setError] = useState<string>("");
    
    // const { loading: nameLoading, error: nameError } = useTypedSelector(state => state.nameForm);
    const { loading: nameLoading, error: nameError } = useAppSelector(state => state.nameForm);
    const { editName } = useActions();

    const handleEditName = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        const verifyResponse = verifyEditName(name);
        if (verifyResponse) {
            setError(verifyResponse.nameError);

            clear();
        }

        if (name && !verifyResponse) {
            await editName(name);

            clear();
        }
    };

    useEffect(() => {
        setError(nameError ?? "");
    }, [nameError]);

    return {
        nameLoading,
        error,
        handleEditName
    };
}
