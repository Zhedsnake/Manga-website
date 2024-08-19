import React from 'react';
import classes from "./errorForm.module.css";


interface ErrorFormProps {
    children: React.ReactNode;
};

const ErrorForm: React.FC<ErrorFormProps> = ({children}) => {
    return (
        <div className={classes.authFormError}><span>{children}</span></div>
    );
};

export default ErrorForm;