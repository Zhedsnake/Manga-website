import React, {useContext, useEffect} from 'react';
import {AuthContext, AuthContextType} from "../context";
import {useTypedSelector} from "../hooks/useTypedSelector.ts";
import {useActions} from "../hooks/useActions.ts";
import {setToken} from "../util/setTocken.ts";
import {Tokens} from "../util/setTocken.ts";

interface AuthProp {
    children: React.ReactNode;
}

const AuthUserGuestChecker: React.FC<AuthProp> = ({children}) => {
    const {
        isAuth,
        setAuthLoading,
        setIsGuest,
        setIsUser
    } = useContext<AuthContextType>(AuthContext);


    const { guestToken: guestTokenResponse, error: guestTokenError } = useTypedSelector(state => state.getGuestToken);
    const { userToken: updatedUserToken, error: userTokenError  } = useTypedSelector(state => state.updateUserToken);
    const { getGuestToken, defGuestToken, getSmallUserInfoByToken, updateUserToken } = useActions();

    useEffect(() => {
        const userToken: string | null = localStorage.getItem(Tokens.userToken);
        const guestToken: string | null = localStorage.getItem(Tokens.guestToken);

        (async function () {
            if (userToken) {
                setIsUser(true);
                setAuthLoading(true);

                await getSmallUserInfoByToken()

                setAuthLoading(false);

                await updateUserToken()

                // if (guestToken) {
                //     await guestService.removeGuest(guestToken)
                //     localStorage.removeItem(Tokens.guestToken);
                // }

            } else if (guestToken) {

                setIsGuest(true)

            } else if (!guestToken) {
                setAuthLoading(true)

                await getGuestToken()

                setAuthLoading(false);
            }
        })()
    }, [isAuth])

    useEffect(() => {
        if (guestTokenResponse) {
            const tokenIsSet: boolean = setToken(Tokens.guestToken, guestTokenResponse);
            setIsGuest(tokenIsSet)

            if (!guestTokenError) {
                defGuestToken()
            } else if (guestTokenError) {
                console.error(guestTokenError)
            }
        }
    }, [guestTokenResponse]);

    useEffect(() => {
        if (updatedUserToken) {
            localStorage.setItem(Tokens.userToken, updatedUserToken);
        }
    }, [updatedUserToken]);

    return (
        <>
            {children}
        </>
    );
};

export default AuthUserGuestChecker;