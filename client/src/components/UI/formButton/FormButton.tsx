import React from 'react';
import classes from "./formButton.module.css";

interface FormButtonProps {
    children: React.ReactNode;
    onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}

const FormButton: React.FC<FormButtonProps> = ({children, ...props}) => {

    return (
        <button {...props} className={classes.authFormButton}>
            <span>
                {children}
            </span>
        </button>
    );
};

export default FormButton;