//Redux
import {Provider} from 'react-redux';
import store from "./store";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from "react";
import AppRouter from "./components/AppRouter";
import AuthUserGuestChecker from "./components/AuthUserGuestChecker.tsx";
import UpdateUserToken from "./components/UpdateUserToken.tsx";
import BrowserWebpCheck from "./components/BrowserWebpCheck.tsx";

import ImportAuthContext from "./components/ImportAuthContext.tsx";
import ImportEditUserInfoContext from "./components/ImportEditUserInfoContext.tsx";


const App: React.FC = () => {

    return (
        <Provider store={store}>
            <ImportAuthContext>
                <ImportEditUserInfoContext>
                    <AuthUserGuestChecker>
                        <UpdateUserToken>
                            <BrowserWebpCheck>
                                <AppRouter/>
                            </BrowserWebpCheck>
                        </UpdateUserToken>
                    </AuthUserGuestChecker>
                </ImportEditUserInfoContext>
            </ImportAuthContext>
        </Provider>
    )
}

export default App
