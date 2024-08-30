import React, {Dispatch, SetStateAction, useState} from 'react';
import Loader from "../UI/Loader/Loader.tsx";
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import {useActions} from "../../hooks/useActions.ts";

interface setMessageInterface {
    setMessage: Dispatch<SetStateAction<string>>;
}

const EditPassword: React.FC<setMessageInterface> = ({setMessage}) => {
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")

    const {loading: passwordLoading, error: passwordError} = useTypedSelector(state => state.passwordForm);
    const {editPassword} = useActions();

    const handleEditPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("")

        await editPassword(oldPassword, newPassword);

        setOldPassword("")
        setNewPassword("")
    }

    const handlerSetOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value)
    }
    const handlerSetNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value)
    }

    return (
        <>
            {passwordError && <div>{passwordError}</div>}
            {passwordLoading
                ? <Loader/>
                :
                <form role="form">
                    <div className="mb-3">
                        <label htmlFor="InputOldPassword">Старый пароль</label>
                        <input
                            type="password" className="form-control"
                            id="InputOldPassword"
                            value={oldPassword}
                            onChange={handlerSetOldPassword}
                        />
                        <label htmlFor="InputNewPassword">Новый пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            id="InputNewPassword"
                            value={newPassword}
                            onChange={handlerSetNewPassword}
                        />
                    </div>
                    <button onClick={handleEditPassword} type="submit" className="btn btn-primary">Поменять пароль</button>
                </form>
            }
        </>
    );
};

export default EditPassword;