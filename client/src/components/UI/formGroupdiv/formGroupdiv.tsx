import React from 'react';
import classes from './formGroupdiv.module.css';

type FormGroupDivProps = {
    children: React.ReactNode;
};

const FormGroupDiv: React.FC<FormGroupDivProps> = ({children}) => {
    return (
        <div className={classes.authFormGroup}>
            {children}
        </div>
    );
};

export default FormGroupDiv;