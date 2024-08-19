import React from 'react';
import classes from "./passwordToggleButton.module.css";

interface PasswordToggleButtonProps {
    type: "button",
    children: React.ReactNode,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const PasswordToggleButton: React.FC<PasswordToggleButtonProps> = ({children, ...props}) => {

    return (
        <button  {...props} className={classes.authPasswordToggleButton}>
            <span>
                {children}
            </span>
        </button>
    );
};

export default PasswordToggleButton;