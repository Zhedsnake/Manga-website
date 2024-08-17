import React, {useEffect, useState} from "react";
import {AuthContext} from "./context";
import AppRouter from "./components/AppRouter";
import Loader from "./components/UI/Loader/Loader.tsx";


//Redux
import {Provider} from 'react-redux';
import store from "./store";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {b} from "vite/dist/node/types.d-aGj9QkWt";



const App: React.FC = () => {
    const [isUser, setIsUser] = useState<boolean>(false);
    const [isGuest, setIsGuest] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const userToken: string = localStorage.getItem('userToken');
        const guestToken: string = localStorage.getItem('guestToken');

        if (userToken {

        } else if (guestToken) {

        } else if (!guestToken) {

        }

        setLoading(false);
    }, [])

    return (
        <Provider store={store}>
            <AuthContext.Provider value={{
                isUser,
                setIsUser,
                isGuest,
                setIsGuest,
                isLoading,
            }}>
                <AppRouter/>
            </AuthContext.Provider>
        </Provider>
    )
}

export default App
