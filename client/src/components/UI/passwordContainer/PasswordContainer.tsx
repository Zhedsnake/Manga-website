import React from 'react';
import classes from "./passwordContainer.module.css";

type PasswordContainerProps = {
    children: React.ReactNode;
};

const PasswordContainer: React.FC<PasswordContainerProps> = ({children}) => {
    return (
        <div className={classes.authPasswordContainer}>
            {children}
        </div>
    );
};

export default PasswordContainer;