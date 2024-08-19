import React from 'react';


type LabelProps = {
    htmlFormName: string;
    children: React.ReactNode;
};

const Label: React.FC<LabelProps> = ({htmlFormName, children}) => {

    return (
        <label htmlFor={htmlFormName}>{children}</label>
    );
};

export default Label;