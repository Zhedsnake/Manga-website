import React from 'react';
import classes from './AuthHeader.module.css';


interface AuthHeaderProps {
    children: React.ReactNode;
};

const AuthHeader: React.FC<AuthHeaderProps> = ({children}) => {
    return (
        <header className={classes.authInputsHeader}>
            <h1>{children}</h1>
        </header>
    );
};

export default AuthHeader;