import React, {useState} from "react";
import {AuthContext} from "./context";
import AppRouter from "./components/AppRouter";


//Redux
import {Provider} from 'react-redux';
import store from "./store";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AuthUserGuestChecker from "./components/AuthUserGuestChecker.tsx";



const App: React.FC = () => {
    const [isUser, setIsUser] = useState<boolean>(false);
    const [isGuest, setIsGuest] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);



    return (
        <Provider store={store}>
            <AuthContext.Provider value={{
                isUser,
                setIsUser,
                isGuest,
                setIsGuest,
                isLoading,
                setLoading
            }}>
                <AuthUserGuestChecker>
                    <AppRouter/>
                </AuthUserGuestChecker>
            </AuthContext.Provider>
        </Provider>
    )
}

export default App
