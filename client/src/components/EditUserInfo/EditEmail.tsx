import React from 'react';
import Loader from "../UI/Loader/Loader.tsx";
import useInput from "../../hooks/useInput.ts";
import useHandleEditEmail from "../../hooks/EditUserInfoHooks/useHandleEditEmail.ts";

const EditEmail : React.FC = () => {
    const email = useInput("")
    const editHandle = useHandleEditEmail<string>(email.value, email.clear)

    return (
        <>
            {editHandle.error && <div>{editHandle.error}</div>}
            {editHandle.emailLoading
                ? <Loader/>
                :
                <form role="form">
                    <div className="mb-3">
                        <label htmlFor="Inputemail">Почта</label>
                        <input
                            type="email"
                            className="form-control"
                            id="Inputemail"
                            aria-describedby="emailHelp"
                            value={email.value}
                            onChange={email.onChange}
                        />
                    </div>
                    <button onClick={editHandle.handleEditEmail} type="submit" className="btn btn-primary">Поменять почту</button>
                </form>
            }
        </>
    );
};

export default EditEmail;