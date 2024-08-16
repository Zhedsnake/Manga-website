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



const App: React.FC = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token: boolean = !!localStorage.getItem('authToken');
        setIsAuth(token);

        setLoading(false);
    }, [])


    if (isLoading) {
        return (<Loader/>)
    }

    return (
        <Provider store={store}>
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth,
                isLoading,
            }}>
                <AppRouter/>
            </AuthContext.Provider>
        </Provider>
    )
}

export default App
