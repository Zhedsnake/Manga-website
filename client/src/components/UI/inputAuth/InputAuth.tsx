import React from 'react';


interface InputAuthProps {
    type: string;
    id: string;
    value: string;
    maxLength: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputAuth: React.FC<InputAuthProps> = (props) => {

    return (
        <input {...props}/>
    );
};

export default InputAuth;