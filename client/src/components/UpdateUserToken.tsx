import React, {useContext, useEffect} from 'react';
import {useTypedSelector} from "../../../buffer/client/src/__tests__/unit/hooks/reduxHooks/useTypedSelector.ts";
import {AuthContext, AuthContextType} from "../contexts/AuthContext.ts";
import {useActions} from "../../../buffer/client/src/__tests__/unit/hooks/reduxHooks/useActions.ts";
import {Tokens} from "../util/Tokens.ts";

interface childrenProp {
    children: React.ReactNode;
}

const UpdateUserToken : React.FC<childrenProp> = ({children}) => {
    const {
        isUser,
        setTokenOutdated
    } = useContext<AuthContextType>(AuthContext);

    const { userToken: updatedUserToken, error: userTokenError } = useTypedSelector(state => state.updateUserToken);
    const { updateUserToken, defUpdateUserToken } = useActions();

    useEffect(() => {
        if (isUser) {
            updateUserToken()
        }
    }, []);

    useEffect(() => {
        if (updatedUserToken) {
            localStorage.setItem(Tokens.userToken, updatedUserToken);

            defUpdateUserToken()
        }
    }, [updatedUserToken]);

    useEffect(() => {
        if (userTokenError) {
            if (userTokenError === "Токен устарел") {
                localStorage.removeItem(Tokens.userToken)
                setTokenOutdated(true);
            }
        }
    }, [userTokenError]);

    return (
        <>
            {children}
        </>
    );
};

export default UpdateUserToken;