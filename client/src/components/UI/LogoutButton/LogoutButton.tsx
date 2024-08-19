import React, {useContext} from 'react';
import logoutIcon from '../../../img/Logout-icon.svg';
import classes from "./logoutButton.module.css";
import {AuthContext} from "../../../context";

const LogoutButton: React.FC = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.removeItem('token')
        setIsAuth(false);
    };

    return (
        <div className={classes.logoutButton}>
            <button onClick={handleLogout} className={classes.logoutButton__text}>Выход</button>
            <button onClick={handleLogout} className={classes.logoutButton__icon}>
                <img src={logoutIcon} alt="Logout" />
            </button>
        </div>
    );
};

export default LogoutButton;
