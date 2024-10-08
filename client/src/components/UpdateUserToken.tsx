import React, {useContext, useEffect} from 'react';
import {AuthContext, AuthContextType} from "../contexts/AuthContext.ts";
import {useActions} from "../hooks/useActions";
import {Tokens} from "../util/Tokens.ts";
import {useAppSelector} from "../hooks/reduxHooks-toolkit/useRedux.ts";

interface childrenProp {
    children: React.ReactNode;
}

const UpdateUserToken : React.FC<childrenProp> = ({children}) => {
    const {
        isUser,
        setTokenOutdated
    } = useContext<AuthContextType>(AuthContext);

    // const { userToken: updatedUserToken, error: userTokenError } = useTypedSelector(state => state.updateUserToken);
    // const { updateUserToken, defUpdateUserToken } = useActions();
    const { userToken: updatedUserToken, loading, error: userTokenError } = useAppSelector(state => state.updateUserToken);
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