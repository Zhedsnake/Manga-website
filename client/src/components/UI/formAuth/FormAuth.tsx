import React from 'react';
import classes from './FormAuth.module.css';

type FormAuthProps = {
    children: React.ReactNode;
};

const FormAuth: React.FC<FormAuthProps> = ({children, ...props}, ) => {

    return (
        <form {...props} className={classes.authForm}>
            {children}
        </form>
    );
};

export default FormAuth;