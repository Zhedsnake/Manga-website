import React, {useContext, useEffect} from 'react';
import {AuthContext, AuthContextType} from "../contexts/AuthContext.ts";
import {setToken} from "../util/setTocken.ts";
import {Tokens} from "../util/Tokens.ts";
import {useAppSelector} from "../hooks/reduxHooks-toolkit/useRedux.ts";
import {useActions} from "../hooks/useActions";

interface AuthProp {
    children: React.ReactNode;
}

const AuthUserGuestChecker: React.FC<AuthProp> = ({children}) => {
    const {
        isAuth,
        setIsAuth,
        tokenOutdated,
        setTokenOutdated,
        setAuthLoading,
        setIsGuest,
        setIsUser
    } = useContext<AuthContextType>(AuthContext);

    // const { userToken: updatedUserToken } = useTypedSelector(state => state.updateUserToken);
    // const { guestToken: guestTokenResponse, error: guestTokenError } = useTypedSelector(state => state.getGuestToken);
    const { getGuestToken, defGuestToken, getSmallUserInfoByToken, updateUserToken } = useActions();
    const {} = useAppSelector(state => state.updateUserToken)
    const {userToken: updatedUserToken, loading, error} = useAppSelector(state => state.getGuestToken)

    const check = async () => {
        const userToken: string | null = localStorage.getItem(Tokens.userToken);

        setAuthLoading(true);

        if (userToken) {
            await updateUserToken()

            // if (guestToken) {
            //     await guestService.removeGuest(guestToken)
            //     localStorage.removeItem(Tokens.ts.guestToken);
            // }

        } else if (!userToken) {
            checkGuest()

            setAuthLoading(false);
        }
    }

    const checkGuest = async () => {
        const guestToken: string | null = localStorage.getItem(Tokens.guestToken);

        if (guestToken) {
            setIsGuest(true)

        } else if (!guestToken) {
            await getGuestToken()
        }
    }

    useEffect(() => {
        (async function (){
            if (updatedUserToken) {
                setIsUser(true);

                await getSmallUserInfoByToken()

                setAuthLoading(false);

            } else if (!updatedUserToken) {
                checkGuest()

                setAuthLoading(false);
            }
        })()
    }, [updatedUserToken]);

    useEffect(() => {
        check()
    }, [])

    useEffect(() => {
        if (isAuth || tokenOutdated) {
            check()

            setIsAuth(false);
            setTokenOutdated(false);
        }
    }, [isAuth, tokenOutdated]);

    useEffect(() => {
        if (guestTokenResponse) {
            setToken(Tokens.guestToken, guestTokenResponse);

            setIsGuest(true)
        }

        if (!guestTokenError) {
            defGuestToken()
        } else if (guestTokenError) {
            console.error(guestTokenError)
        }
    }, [guestTokenResponse, guestTokenError]);


    return (
        <>
            {children}
        </>
    );
};

export default AuthUserGuestChecker;