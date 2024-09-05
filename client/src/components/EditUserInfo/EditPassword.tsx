import React from 'react';
import Loader from "../UI/Loader/Loader.tsx";
import useInput from "../../hooks/useInput.ts";
import useHandleEditPassword from "../../hooks/EditUserInfoHooks/useHandleEditPassword.ts";

const EditPassword: React.FC = () => {
    const oldPassword = useInput<string>("")
    const newPassword = useInput<string>("")
    const editHandle = useHandleEditPassword(oldPassword.value, newPassword.value, oldPassword.clear, newPassword.clear)

    return (
        <>
            {editHandle.error && <div>{editHandle.error}</div>}
            {editHandle.passwordLoading
                ? <Loader/>
                :
                <form role="form">
                    <div className="mb-3">
                        <label htmlFor="InputOldPassword">Старый пароль</label>
                        <input
                            type="password" className="form-control"
                            id="InputOldPassword"
                            value={oldPassword.value}
                            maxLength={20}
                            onChange={oldPassword.onChange}
                        />
                        <label htmlFor="InputNewPassword">Новый пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            id="InputNewPassword"
                            maxLength={20}
                            value={newPassword.value}
                            onChange={newPassword.onChange}
                        />
                    </div>
                    <button onClick={editHandle.handleEditPassword} type="submit" className="btn btn-primary">Поменять пароль</button>
                </form>
            }
        </>
    );
};

export default EditPassword;