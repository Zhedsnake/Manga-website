import React, {useState} from 'react';
import {EditUserInfoContext} from "../contexts/EditUserInfoContext.ts";

interface childrenProp {
    children: React.ReactNode;
}

const ImportEditUserInfoContext: React.FC<childrenProp> = ({children}) => {

    const [message, setMessage] = useState<string>("")

    return (
        <EditUserInfoContext.Provider value={{
            message,
            setMessage
        }}>
            {children}
        </EditUserInfoContext.Provider>
    );
};

export default ImportEditUserInfoContext;