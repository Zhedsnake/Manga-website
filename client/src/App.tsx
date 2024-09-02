
//Redux
import {Provider} from 'react-redux';
import store from "./store";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React, {useState} from "react";
import {AuthContext} from "./context";
import AppRouter from "./components/AppRouter";
import {ToggleShowType} from "./types/AuthForm";
import AuthUserGuestChecker from "./components/AuthUserGuestChecker.tsx";
import UpdateUserToken from "./components/UpdateUserToken.tsx";
import BrowserWebpCheck from "./components/BrowserWebpCheck.tsx";


const App: React.FC = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [tokenOutdated, setTokenOutdated] = useState<boolean>(false)

    const [isUser, setIsUser] = useState<boolean>(false);
    const [isGuest, setIsGuest] = useState<boolean>(false);

    const [isAuthLoading, setAuthLoading] = useState<boolean>(true);

    const defToggleShowFormPasswords: ToggleShowType = {
        toggleShowPassword: false,
        toggleShowConfirmPassword: false
    };
    const [toggleShowFormPasswords, setToggleShowFormPasswords] = useState<ToggleShowType>({...defToggleShowFormPasswords});


    return (
        <Provider store={store}>
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth,
                tokenOutdated,
                setTokenOutdated,
                isUser,
                setIsUser,
                isGuest,
                setIsGuest,
                isAuthLoading,
                setAuthLoading,
                toggleShowFormPasswords,
                setToggleShowFormPasswords,
                defToggleShowFormPasswords
            }}>
                <AuthUserGuestChecker>
                    <UpdateUserToken>
                        <BrowserWebpCheck>
                            <AppRouter/>
                        </BrowserWebpCheck>
                    </UpdateUserToken>
                </AuthUserGuestChecker>
            </AuthContext.Provider>
        </Provider>
    )
}

export default App
